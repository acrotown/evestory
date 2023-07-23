import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { env } from "@/env.mjs"

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
}

export const isHomeHostname = (domain: string) => {
  return (
    new Set(["localhost", "localhost:3000", env.NEXT_PUBLIC_ROOT_DOMAIN]).has(
      domain
    ) || domain.endsWith(".vercel.app")
  )
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname

  /** Get hostname of request (e.g kiw.evestory.day, kiw.localhost:3000) */
  let domain = req.headers.get("host") as string
  domain = domain.replace("www.", "")
  if (isHomeHostname(domain)) domain = env.NEXT_PUBLIC_ROOT_DOMAIN

  const APP_HOSTNAMES = new Set([
    `app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
    "app.localhost:3000",
  ])

  const ROOT_HOSTNAMES = new Set([
    env.NEXT_PUBLIC_ROOT_DOMAIN,
    "localhost:3000",
  ])

  if (APP_HOSTNAMES.has(domain)) {
    const session = (await getToken({ req, secret: env.NEXTAUTH_SECRET })) as {
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
      new URL(`app${path === "/" ? "" : path}`, req.url)
    )
  }

  if (ROOT_HOSTNAMES.has(domain)) {
    return NextResponse.rewrite(new URL(`/home${path}`, req.url))
  }

  // rewrite everything else to `/[domain]/[path] dynamic route
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url))
}
