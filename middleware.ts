import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { env } from "./env.mjs"

export const config = {
  matcher: [
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
}

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const session = (await getToken({ req, secret: env.NEXTAUTH_SECRET })) as {
    email?: string
  }

  if (session?.email && path === "/") {
    return NextResponse.redirect(new URL("/home", req.url))
  } else if (!session?.email && path === "/") {
    return NextResponse.next()
  } else if (!session?.email && path !== "/login" && path !== "/register") {
    return NextResponse.redirect(
      new URL(
        `/login${path !== "/" ? `?redirect=${encodeURIComponent(path)}` : ""}`,
        req.url
      )
    )
  } else if (session?.email && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
}
