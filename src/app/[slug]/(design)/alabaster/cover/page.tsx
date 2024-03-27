import { getCacheEventBySlugForPublic } from "@/lib/db/events";
import { constructMetadata } from "@/lib/utils";

import Cover from "./cover";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let event = await getCacheEventBySlugForPublic(params.slug);

  let title = `${event.grooms?.name} & ${event.brides?.name} Wedding Invitation | evestory`;
  let description = `${params.slug} wedding invitation.`;

  return constructMetadata({
    title,
    description,
  });
}

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  let event = await getCacheEventBySlugForPublic(slug);

  return <Cover event={event} />;
}
