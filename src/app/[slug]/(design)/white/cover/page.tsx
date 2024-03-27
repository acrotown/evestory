import { getCacheEventBySlugForPublic } from "@/lib/db/events";

import Cover from "./cover";

export default async function CoverPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = params;

  let event = await getCacheEventBySlugForPublic(slug);

  return <Cover event={event} />;
}
