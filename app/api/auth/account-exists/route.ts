import { NextRequest, NextResponse } from "next/server"

import prisma from "@/lib/prisma"

// export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { email } = (await req.json()) as { email: string }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (user) {
    return new NextResponse(JSON.stringify({ exists: true }))
  }
  return new NextResponse(JSON.stringify({ exists: false }))
}
