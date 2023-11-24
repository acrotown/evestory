import "server-only"

import { unstable_cache } from "next/cache"
import { cache } from "react"

import { getSession } from "../auth"
import { db } from "../prisma"

export let getEvents = cache(async () => {
  let session = await getSession()
  let events = await db.event.findMany({
    where: {
      userId: session.user.id,
    },
  })

  return events
})

export let getCacheEvents = unstable_cache(
  async () => {
    let session = await getSession()
    let events = await db.event.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return events
  },
  ["events"],
  {
    tags: ["events"],
  },
)

export let getEvent = cache(async (slug: string) => {
  let eventData = await db.event.findUnique({
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

  return eventData
})
