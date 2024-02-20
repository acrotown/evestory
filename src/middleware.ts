import { ipAddress } from "@vercel/edge";
import { get } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import {
  APP_HOSTNAMES,
  isHomeHostname,
  SOUVENIRS_HOSTNAMES,
} from "@/lib/constants";

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

  /** Get hostname of request (e.g kiw.evestory.day, kiw.localhost:3000) */
  let domain = req.headers.get("host") as string;
  domain = domain.replace("www.", "");

  if (isHomeHostname(domain)) {
    return NextResponse.rewrite(new URL(`/home${path ? "/" : path}`, req.url));
  }

  if ("willing-piglet-jointly.ngrok-free.app".includes(domain)) {
    return NextResponse.rewrite(new URL(`/app${path ?? ""}`, req.url));
  }

  if (APP_HOSTNAMES.has(domain)) {
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
    if (session?.email && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("path", path);

    return NextResponse.rewrite(
      new URL(`/app.evestory.day${path === "/" ? "" : path}`, req.url),
    );
  }

  if (SOUVENIRS_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(new URL(`/souvenirs${path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url));
}
