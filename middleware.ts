import { get } from "@vercel/edge-config"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import {
  APP_HOSTNAMES,
  isHomeHostname,
  SOUVENIRS_HOSTNAMES,
} from "@/lib/constants"

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  /** Get hostname of request (e.g kiw.evestory.day, kiw.localhost:3000) */
  let domain = req.headers.get("host") as string
  domain = domain.replace("www.", "")

  const prodIsMaintenanceMode =
    process.env.VERCEL_ENV === "production"
      ? await get<boolean>("prodIsMaintenanceMode")
      : false

  if (prodIsMaintenanceMode) {
    return NextResponse.rewrite(new URL(`/maintenance${path}`, req.url))
  }

  if (isHomeHostname(domain)) {
    return NextResponse.rewrite(new URL(`/home${path ? "/" : path}`, req.url))
  }

  if (APP_HOSTNAMES.has(domain)) {
    const session = (await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    })) as {
      email?: string
    }

    if (!session?.email && path !== "/login" && path !== "/register") {
      return NextResponse.redirect(
        new URL(
          `/login${
            path !== "/" ? `?redirect=${encodeURIComponent(path)}` : ""
          }`,
          req.url
        )
      )
    } else if (session?.email && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "/overview" : path}`, req.url)
    )
  }

  if (SOUVENIRS_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(new URL(`/souvenirs${path}`, req.url))
  }

  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url))
}
