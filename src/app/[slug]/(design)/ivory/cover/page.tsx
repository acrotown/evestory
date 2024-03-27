import { getCacheEventBySlugForPublic } from "@/lib/db/events";

import Cover from "./cover";

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let event = await getCacheEventBySlugForPublic(params.slug);

  return <Cover event={event} />;
}
