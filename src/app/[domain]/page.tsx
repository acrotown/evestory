import { format } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

import { db } from "@/lib/drizzle";
import { cn, constructMetadata } from "@/lib/utils";
import { alice, cormorant } from "@/styles/fonts";

import { Background } from "./background";
import { BottomNav } from "./bottom-nav";

export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}) {
  const title = `${params.domain.toUpperCase()}`;
  const description = `${params.domain.toUpperCase()} is a wedding invitation website.`;

  return constructMetadata({
    title,
    description,
  });
}

let getEvent = async (url: string) => {
  let res = await db.query.events.findFirst({
    where(fields, { eq }) {
      return eq(fields.url, url);
    },
    with: {
      grooms: true,
      brides: true,
    },
  });

  return res;
};

export default async function Domain({
  params,
}: {
  params: { domain: string };
}) {
  let domain = params.domain.split(".");
  if (domain.length === 0 || !domain[0]) {
    throw notFound();
  }

  let event = await getEvent(domain[0]);
  // let event = await getEvent("chandler-monica");

  if (!event || !event?.isPublished) {
    throw notFound();
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 overflow-x-hidden md:grid-cols-2 xl:grid-cols-3",
        alice.className,
      )}
    >
      <div className="sticky top-4 z-10 m-4 hidden rounded-2xl shadow-inner md:block xl:col-span-2">
        <div className="p-5">
          <Image
            src="https://picsum.photos/2000/2000"
            fill
            objectFit="cover"
            alt="hasdf"
            className="rounded-2xl"
          />
        </div>
      </div>

      <div className="relative">
        <div className="relative h-[100svh]">
          <Background />

          <div className="z-10 h-full overflow-auto scrollbar-hide max-lg:mx-4">
            <Couple event={event} />
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

function Couple({ event }: { event: Awaited<ReturnType<typeof getEvent>> }) {
  let date = event?.date ? format(new Date(event?.date), "do MMMM yyyy") : "";

  let [day, month, year] = date.split(" ");

  return (
    <div className="flex flex-col space-y-10 pb-32 pt-80">
      <h1
        className={cn(
          "text-center text-5xl text-[#555650]",
          cormorant.className,
        )}
      >
        <Balancer>
          {event?.grooms?.name} & {event?.brides?.name}
        </Balancer>
      </h1>
      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>invite you to join in the celebration of their</Balancer>
      </p>
      <h1
        className={cn(
          "text-center text-5xl text-[#555650]",
          cormorant.className,
        )}
      >
        <Balancer>Wedding</Balancer>
      </h1>

      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>on</Balancer>
      </p>

      <div className="flex items-center justify-evenly">
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>hotel name</Balancer>
        </p>
        <div className="border-x-2 border-[#A59D40] px-6 text-center text-lg font-bold uppercase tracking-[0.2em] text-foreground max-md:mx-3">
          <p>{day}</p>
          <p>{month}</p>
          <p>{year}</p>
        </div>
        <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>New York City</Balancer>
        </p>
      </div>

      <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
        <Balancer>1pm onwards. Reception to follow.</Balancer>
      </p>
    </div>
  );
}
