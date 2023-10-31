import Image from "next/image"
import React, { Suspense } from "react"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { getEvent } from "@/lib/db/events"

import CoupleInformationForm from "./form"
import Loading from "./loading"

export default async function CoupleInformation({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const event = await getEvent(slug)

  return (
    <MaxWidthWrapper className="flex space-x-11">
      <Suspense fallback={<Loading />}>
        <section className="max-w-xl flex-1 py-10">
          <div className="space-y-0">
            <h3 className="font-display text-4xl">Couple Information</h3>
            <p className="text-muted-foreground">
              Detail for couple information.
            </p>
          </div>

          <div className="flex pt-8">
            <CoupleInformationForm event={event} />
          </div>
        </section>
        <Image
          src="/_static/couple-information.png"
          alt="Couple Information"
          priority
          width={300}
          height={400}
          className="sticky top-24 w-[300px] self-baseline pt-4 2xl:w-[400px]"
        />
      </Suspense>
    </MaxWidthWrapper>
  )
}
