import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { Suspense } from "react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Separator } from "@/components/ui/separator";
import { getEvent } from "@/lib/db/events";
import { generateRandomImage } from "@/lib/utils";

import EventInformationForm from "./_components/form";
import SubEventList from "./_components/sub-event-list";
import Loading from "./loading";

export default async function CoupleInformation({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;
  const event = await getEvent(slug);

  let svg = generateRandomImage();
  let svg2 = generateRandomImage();
  let svg3 = generateRandomImage();

  return (
    <MaxWidthWrapper>
      <div className="flex flex-row space-x-24">
        <section className="max-w-xl flex-1 py-10">
          <h3 className="font-display text-4xl">Event Information</h3>
          <p className="text-muted-foreground">Detail for event information.</p>

          <div className="flex flex-col pt-8">
            <Suspense fallback={<Loading />}>
              <EventInformationForm event={event} />
            </Suspense>
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="font-display text-4xl">Event Schedules</h3>
            <p className="text-muted-foreground">
              A list of all the schedules happening on the wedding day.
            </p>
          </div>

          <Suspense fallback={<Loading />}>
            <SubEventList event={event} />
          </Suspense>
        </section>

        <section className="sticky top-36 h-[70%] border border-foreground/5 max-lg:hidden">
          <div className="sticky flex flex-col space-y-6">
            <div className="relative">
              <PlusIcon className="absolute -left-3 -top-3 h-6 w-6" />
              <PlusIcon className="absolute -right-3 -top-3 h-6 w-6" />
              <Image
                src={"/_static/" + svg}
                alt={svg || "Random Image"}
                priority
                width={300}
                height={300}
                className="p-4"
              />
            </div>
            <div className="relative">
              <PlusIcon className="absolute -left-3 -top-3 h-6 w-6" />
              <PlusIcon className="absolute -right-3 -top-3 h-6 w-6" />
              <Image
                src={"/_static/" + svg2}
                alt={svg2 || "Random Image"}
                priority
                width={300}
                height={300}
                className="p-4"
              />
            </div>
            <div className="relative">
              <PlusIcon className="absolute -left-3 -top-3 h-6 w-6" />
              <PlusIcon className="absolute -right-3 -top-3 h-6 w-6" />
              <Image
                src={"/_static/" + svg3}
                alt={svg3 || "Random Image"}
                priority
                width={300}
                height={300}
                className="p-4"
              />

              <PlusIcon className="absolute -bottom-3 -left-3 h-6 w-6" />
              <PlusIcon className="absolute -bottom-3 -right-3 h-6 w-6" />
            </div>
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
