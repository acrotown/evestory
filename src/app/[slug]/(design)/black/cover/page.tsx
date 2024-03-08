import { notFound } from "next/navigation";

import { db } from "@/lib/drizzle";
import { constructMetadata } from "@/lib/utils";

import Wrapper from "../right-section-wrapper";
import Cover from "./cover";

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
      grooms: true,
      brides: true,
    },
  });

  return res;
};

export type eventType = Awaited<ReturnType<typeof getEvent>>;

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  let event = await getEvent(slug);

  if (!event) {
    notFound();
  }

  return (
    <Wrapper>
      <Cover event={event} />
    </Wrapper>
  );
}
