import { ipAddress } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  APP_HOSTNAMES,
  isHomeHostname,
  SOUVENIRS_HOSTNAMES,
} from "@/lib/constants";
import { events } from "#/drizzle/schema";

import { db } from "./lib/drizzle";

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  let path = req.nextUrl.pathname;
  let ip = ipAddress(req) || "";
  // 118.98.26.6 resend ip ig
  console.info("ip: ", ip);
  let isKevsDevices = (await get<Array<string>>("isKevsDevices")) || [];
  console.info("isKevsDevices: ", isKevsDevices);
  let isProdMaintenanceMode =
    (await get<boolean>("isProdMaintenanceMode")) || false;
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
    // return NextResponse.rewrite(new URL(`/app${path ?? ""}`, req.url));
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
    return NextResponse.error();
  }

  let [event] = await db
    .select({
      design: events.design,
      url: events.url,
      isPublished: events.isPublished,
    })
    .from(events)
    .where(eq(events.url, url));
  let isEventExist = !!event?.url;

  if (!isEventExist || !event?.isPublished) {
    // Redirect to not found page if event not exist or not published.
    return NextResponse.error();
  }

  // Rewrite everything to appropriate design.
  return NextResponse.rewrite(
    new URL(`/${url}/${event.design}${path === "/" ? "" : path}`, req.url),
  );
}
