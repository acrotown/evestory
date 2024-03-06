import { format } from "date-fns";
import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";

import { db } from "@/lib/drizzle";
import { cn, constructMetadata } from "@/lib/utils";
import { cormorant } from "@/styles/fonts";

import Wrapper from "../../wrapper";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let title = `${params.slug?.toUpperCase()}`;
  let description = `${params.slug?.toUpperCase()} wedding invitation.`;

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

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  if (!slug) {
    notFound();
  }

  let event = await getEvent(slug);
  // let event = await getEvent("chandler-monica");

  if (!event || !event?.isPublished) {
    throw notFound();
  }
  let date = event?.date ? format(new Date(event?.date), "do MMMM yyyy") : "";

  let [day, month, year] = date.split(" ");

  return (
    <Wrapper>
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
    </Wrapper>
  );
}
