import { ipAddress } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  APP_DOMAIN,
  APP_HOSTNAMES,
  isHomeHostname,
  SOUVENIRS_HOSTNAMES,
} from "@/lib/constants";

import { getCacheEventBySlugForMiddleware } from "./lib/db/events";

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  let path = req.nextUrl.pathname;
  let ip = ipAddress(req) || "";
  let isKevsDevices =
    process.env.NODE_ENV === "production"
      ? (await get<Array<string>>("isKevsDevices")) || []
      : [];
  let isProdMaintenanceMode =
    process.env.NODE_ENV === "production"
      ? (await get<boolean>("isProdMaintenanceMode")) || false
      : false;
  let isProd = process.env.VERCEL_ENV === "production";

  let isMaintenance = false;

  /** Get hostname of request (e.g kiw.evestory.day, kiw.localhost:3000) */
  let domain = req.headers.get("host") as string;
  domain = domain.replace("www.", "");

  if (isHomeHostname(domain)) {
    if (isProd) {
      if (isKevsDevices.includes(ip)) {
        isMaintenance = false;
      } else {
        isMaintenance = isProdMaintenanceMode;
      }
    }

    if (isMaintenance) {
      return NextResponse.rewrite(new URL(`/maintenance${path}`, req.url));
    }

    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  if ("willing-piglet-jointly.ngrok-free.app".includes(domain)) {
    return NextResponse.rewrite(
      new URL(`/${domain}${path === "/" ? "" : path}`, req.url),
    );
  }

  if (APP_HOSTNAMES.has(domain)) {
    if (isProd) {
      if (isKevsDevices.includes(ip)) {
        isMaintenance = false;
      } else {
        isMaintenance = isProdMaintenanceMode;
      }
    }

    if (isMaintenance) {
      return NextResponse.rewrite(new URL(`/maintenance${path}`, req.url));
    }

    let session = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as {
      email?: string;
    };

    if (!session?.email && path !== "/login" && path !== "/register") {
      return NextResponse.redirect(
        new URL(
          `/login${
            path !== "/" ? `?redirect=${encodeURIComponent(path)}` : ""
          }`,
          req.url,
        ),
      );
    }

    // let [userExist] = await db
    //   .select()
    //   .from(users)
    //   .where(eq(users.email, session?.email || ""));
    // console.log("userExist: ", userExist);

    // // If user logged in but somehow not exsists in db, redirect to login.
    // if (session?.email && !userExist?.id) {
    // TODO:
    // }

    if (session?.email && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    let splitPath = path.split("/").filter(Boolean);

    if (
      splitPath.length >= 3 &&
      splitPath[0] === "event" &&
      splitPath[2] === "preview"
    ) {
      let url = splitPath[1];
      let lastPath = splitPath[3];

      if (url) {
        let res = await fetch(`${APP_DOMAIN}/api/event/` + url);
        let [event] = (await res.json()) as Awaited<
          ReturnType<typeof getCacheEventBySlugForMiddleware>
        >;

        if (!event?.url) {
          // Redirect to not found page if event URL does not exist.
          return NextResponse.rewrite(new URL("/404", req.url));
        }

        let allowedPaths = [
          undefined,
          "cover",
          "couple",
          "event",
          "wishes",
          "stories",
          "galleries",
          "gift",
        ];

        if (allowedPaths.includes(lastPath)) {
          return NextResponse.rewrite(
            new URL(
              `/${url}/${event.design}/${
                path === "/" || lastPath === undefined ? "" : lastPath
              }`,
              req.url,
            ),
          );
        }
      }
    }

    return NextResponse.rewrite(
      new URL(`/app.evestory.day${path === "/" ? "" : path}`, req.url),
    );
  }

  if (SOUVENIRS_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(
      new URL(`/souvenirs${path === "/" ? "" : path}`, req.url),
    );
  }

  let [url] = domain.split(".");
  if (!url) {
    // Redirect to not found page, notFound is not working here.
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  let res = await fetch(`${APP_DOMAIN}/api/event/` + url);
  let [event] = (await res.json()) as Awaited<
    ReturnType<typeof getCacheEventBySlugForMiddleware>
  >;

  let isEventExist = !!event?.url;

  if (!isEventExist || !event?.isPublished || event?.paymentStatus !== "paid") {
    // Redirect to not found page if event not exist or not published.
    return NextResponse.rewrite(new URL("/404", req.url));
  }

  // Rewrite everything to appropriate design.
  return NextResponse.rewrite(
    new URL(`/${url}/${event.design}${path === "/" ? "" : path}`, req.url),
  );
}
