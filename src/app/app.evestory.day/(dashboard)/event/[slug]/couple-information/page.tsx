import { PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { Suspense } from "react";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { SVGS } from "@/lib/constants/svgs";
import { getEventBySlug } from "@/lib/db/events";
import { generateRandomImage } from "@/lib/utils";

import CoupleInformationForm from "./_components/form";
import Loading from "./loading";

export default async function CoupleInformation({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;
  let event = await getEventBySlug(slug);
  let svg = generateRandomImage(SVGS);
  let svg2 = generateRandomImage(SVGS);
  let svg3 = generateRandomImage(SVGS);

  return (
    <MaxWidthWrapper>
      <div className="flex flex-row space-x-24">
        <section className="max-w-xl flex-1 py-10">
          <h3 className="font-display text-4xl">Couple Information</h3>
          <p className="text-muted-foreground">
            Detail for couple information.
          </p>

          <div className="flex pt-8">
            <Suspense fallback={<Loading />}>
              <CoupleInformationForm event={event} />
            </Suspense>
          </div>
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
