import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

import { db } from "@/lib/drizzle";
import { cn, constructMetadata } from "@/lib/utils";
import { cormorant } from "@/styles/fonts";

import RightSectionWrapper from "../right-section-wrapper";
import EventDate from "./event-date";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let title = `${params.slug}`;
  let description = `${params.slug} wedding invitation.`;

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
      grooms: {
        columns: {
          name: true,
        },
      },
      brides: {
        columns: {
          name: true,
        },
      },
    },
  });

  return res;
};

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  let event = await getEvent(slug);

  if (!event) notFound();

  return (
    <RightSectionWrapper>
      <div className="flex flex-col space-y-10 pb-32 pt-80">
        <h1
          className={cn("text-center font-cormorant text-5xl text-[#555650]")}
        >
          <Balancer>
            {event?.grooms?.name} & {event?.brides?.name}
          </Balancer>
        </h1>
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>invite you to join in the celebration of their</Balancer>
        </p>
        <h1
          className={cn("text-center font-cormorant text-5xl text-[#555650]")}
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
          <EventDate eventDate={event.date} />
          <p className="w-32 text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
            <Balancer>New York City</Balancer>
          </p>
        </div>

        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-foreground">
          <Balancer>1pm onwards. Reception to follow.</Balancer>
        </p>
      </div>
    </RightSectionWrapper>
  );
}
