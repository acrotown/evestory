import "server-only"

import { cache } from "react"

import { getSession } from "../auth"
import { db } from "../prisma"
import { EventProps } from "../types"

export const getEvents = cache(async () => {
  const session = await getSession()
  const events = await db.event.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return events
})

export const getEvent = cache(async (slug: string) => {
  const eventData = await db.event.findUnique({
    where: { url: slug },
    select: {
      id: true,
      name: true,
      description: true,
      isShowGroomNameFirst: true,
      groomName: true,
      groomInstagram: true,
      groomPhoto: true,
      isShowGroomParentsName: true,
      groomParentsName: true,
      brideName: true,
      brideInstagram: true,
      bridePhoto: true,
      isShowBrideParentsName: true,
      brideParentsName: true,
      published: true,
      url: true,
      date: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  })

  return eventData as EventProps
})
