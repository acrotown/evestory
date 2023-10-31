import { z } from "zod"

import { withAuth } from "@/lib/auth"
import { db } from "@/lib/prisma"

export const GET = withAuth(async ({ event }) => {
  return Response.json(event, { status: 200 })
})

export const PATCH = withAuth(async ({ req, session, params }) => {
  try {
    const body = await req.json()
    const { slug } = params
    const schema = z.object({
      groomPhoto: z.string().optional(),
      bridePhoto: z.string().optional(),
    })
    const data = schema.parse(body)
    const data_ = {} as { bridePhoto?: string; groomPhoto?: string }
    data.bridePhoto && (data_["bridePhoto"] = data.bridePhoto)
    data.groomPhoto && (data_["groomPhoto"] = data.groomPhoto)

    await db.event.update({
      where: {
        url: slug,
      },
      data: data_,
    })
    return Response.json({ message: "Updated successfully." }, { status: 200 })
  } catch (err) {
    console.log(err)
    return Response.json(
      { message: "Error updating." },
      {
        status: 500,
      },
    )
  }
})
