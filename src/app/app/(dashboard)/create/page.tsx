import Image from "next/image"
import React from "react"
import Balancer from "react-wrap-balancer"

import MaxWidthWrapper from "@/components/max-width-wrapper"

import CreateEventForm from "./form"

export default function Create() {
  return (
    <MaxWidthWrapper className="flex space-x-11">
      <section className="max-w-xl flex-1 pt-10">
        <div className="flex-col space-y-1">
          <h1 className="font-display text-5xl">
            <Balancer>Start crafting your wedding website.</Balancer>
          </h1>
          {/* <h2 className="text-muted-foreground">
            Fill in the form below to get started.
          </h2> */}
        </div>

        <div className="flex flex-col-reverse pt-8 lg:flex-row lg:space-x-11">
          <CreateEventForm />
        </div>
      </section>
      <Image
        src="/_static/create-wedding-site.png"
        alt="Create Wedding Site"
        priority
        width={420}
        height={420}
        className="self-center pt-10"
      />
    </MaxWidthWrapper>
  )
}
