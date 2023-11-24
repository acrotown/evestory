"use server"

import { format } from "date-fns"
import { revalidateTag } from "next/cache"
import { z } from "zod"

import { getSession } from "@/lib/auth"
import { logsnag } from "@/lib/logsnag"
import { db } from "@/lib/prisma"
import { CreateEventSchema } from "@/schemas/create-event.schema"

type InputType = z.infer<typeof CreateEventSchema>

export async function createEvent(data: InputType) {
  let session = await getSession()

  try {
    let event = await db.event.create({
      data: {
        userId: session.user.id,
        groomName: data.groomName,
        brideName: data.brideName,
        name: data.eventName,
        url: data.websiteURL,
        date: data.eventDate,
      },
    })

    await logsnag.track({
      channel: "create-events",
      event: "Event Created",
      description: `${session.user.name} created an event - ${event.name}`,
      icon: "🎉",
      tags: {
        event_id: event.id,
        event_name: event.name,
        event_url: event.url,
        event_date: format(new Date(event.date), "PPP"),
        event_user_id: session.user.email,
      },
      notify: true,
    })

    revalidateTag("events")

    return {
      data: event,
      ok: true,
      message: "Event created successfully.",
      errors: null,
    }
  } catch (err) {
    // @ts-ignore
    if (err.code === "P2002") {
      return {
        ok: false,
        data: null,
        errors: {
          websiteURL: ["Website URL already exists."],
        },
        message: "Website URL already exists.",
      }
    } else {
      console.log(err)
      return {
        errors: err,
        data: null,
        message: "Failed to create event.",
        ok: false,
      }
    }
  }
}
