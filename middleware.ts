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

  /** If there's no session
   * and the path is not /login or /register
   * and path is /dashboard
   * then redirect to /login
   */
  if (
    !session?.email &&
    path !== "/login" &&
    path !== "/register" &&
    path === "/dashboard"
  ) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(path)}`, req.url)
    )
  } else if (session?.email) {
    /** If there's a session and the path is /login or /register then redirect to / */
    if (path === "/login" || path === "/register") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.rewrite(new URL(path, req.url))
}
