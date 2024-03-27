import { getCacheEventBySlugForPublic } from "@/lib/db/events";

export type EventTypeForPublic = Awaited<
  ReturnType<typeof getCacheEventBySlugForPublic>
>;
