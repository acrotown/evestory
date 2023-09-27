import { eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

import { users } from "@/drizzle/schema"
import drizzle from "@/lib/drizzle"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string }

  if (!drizzle) {
    return new NextResponse("Database connection failed", { status: 500 })
  }

  const user = await drizzle.select().from(users).where(eq(users.email, email))

  if (user.length > 0) {
    return new NextResponse(JSON.stringify({ exists: true }))
  }
  return new NextResponse(JSON.stringify({ exists: false }))
}
