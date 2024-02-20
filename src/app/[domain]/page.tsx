import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

import { db } from "@/lib/drizzle";
import { constructMetadata } from "@/lib/utils";
import { events } from "#/drizzle/schema";

import Index from "./_components";

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

// export async function generateStaticParams() {
//   const domains =
//     process.env.VERCEL_ENV === "production"
//       ? await db
//           .select({ url: events.url })
//           .from(events)
//           .where(eq(events.isPublished, true))
//       : [];
//
//   return domains.map(({ url: domain }) => ({
//     domain,
//   }));
// }

let getEvent = async (url: string) => {
  let res = await db.query.events.findFirst({
    where(fields, { eq }) {
      return eq(fields.url, url);
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
  if (domain.length === 0) {
    throw notFound();
  }

  let event = await getEvent(domain[0]!);

  if (!event?.isPublished) {
    throw notFound();
  }

  return (
    <div>
      <Index />
      <h1>Domain : {params.domain}</h1>
    </div>
  );
}
