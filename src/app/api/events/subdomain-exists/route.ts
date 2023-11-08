import { z } from "zod"

import { withSession } from "@/lib/auth"
import { db } from "@/lib/prisma"

export const POST = withSession(async ({ req }) => {
  try {
    const body = await req.json()
    const schema = z.object({
      subdomain: z.string(),
    })
    const data = schema.parse(body)
    const event = await db.event.findUnique({
      where: {
        url: data.subdomain,
      },
    })

    if (event) {
      return Response.json({ exists: true }, { status: 200 })
    }

    return Response.json({ exists: false }, { status: 200 })
  } catch (err) {
    console.log("err", err)
    return Response.json(
      { message: "Error checking subdomain." },
      { status: 500 },
    )
  }
})
