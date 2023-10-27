import { getEvent } from "@/lib/db/events"

import CoupleInformationClient from "./page-client"

export default async function CoupleInformation({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const event = await getEvent(slug)

  return <CoupleInformationClient event={event} />
}
