import Link from "next/link"
import { Suspense } from "react"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button } from "@/components/ui/button"
import { APP_DOMAIN } from "@/lib/constants"
import { getCacheEvents, getEvents } from "@/lib/db/events"

import CardEvent from "./card-event"

export default async function Events() {
  // const events = await getEvents()
  const events = await getCacheEvents()

  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          {events.length > 0 ? (
            <>
              <div className="flex items-center justify-between">
                <h1 className="font-display text-4xl">Your event story</h1>
                <Button asChild>
                  <Link href={`${APP_DOMAIN}/create`}>Create new event</Link>
                </Button>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  return <CardEvent key={event.id} event={event} />
                })}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h1 className="font-display text-4xl">Create your first event</h1>
              <p className="mt-2 text-muted-foreground">
                Create your first event and start sharing your story with your
                guests.
              </p>
              <Button asChild className="mt-6">
                <Link href={`${APP_DOMAIN}/create`}>Create new event</Link>
              </Button>
            </div>
          )}
        </Suspense>
      </section>
    </MaxWidthWrapper>
  )
}
