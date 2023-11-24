import { revalidateTag } from "next/cache"
import { z } from "zod"

import { withSession, withUserAuth } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { CreateEventSchema } from "@/schemas/create-event.schema"

export const GET = withSession(async ({ session }) => {
  const events = await db.event.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
      groomName: true,
      brideName: true,
      date: true,
      url: true,
      published: true,
      updatedAt: true,
    },
  })

  return Response.json(events, { status: 200 })
})

export const POST = withUserAuth(async (req, _res, session) => {
  const data = (await req.json()) as z.infer<typeof CreateEventSchema>

  try {
    await db.event.create({
      data: {
        groomName: data.groomName,
        brideName: data.brideName,
        name: data.eventName,
        url: data.websiteURL,
        date: data.eventDate,
        userId: session.user.id,
      },
    })

    revalidateTag("events")

    return Response.json(
      { message: "Successfully create event." },
      { status: 201 },
    )
  } catch (err) {
    console.log(err)
    return Response.json(
      { message: "Error creating event." },
      {
        status: 500,
      },
    )
  }
})
