import { NextRequest, NextResponse } from "next/server"

import { conn } from "@/lib/planetscale"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string }

  if (!conn) {
    return new NextResponse("Database connection failed", { status: 500 })
  }

  const user = await conn.execute("SELECT email FROM User WHERE email = ?", [
    email,
  ])

  if (user) {
    return new NextResponse(JSON.stringify({ exists: true }))
  }
  return new NextResponse(JSON.stringify({ exists: false }))
}