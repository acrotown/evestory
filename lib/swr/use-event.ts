import { useParams } from "next/navigation"
import useSWR from "swr"

import { EventProps } from "../types"
import { fetcher } from "../utils"

export default function useEvent() {
  const { slug } = useParams() as { slug?: string }

  const {
    data: event,
    isLoading,
    error,
  } = useSWR<EventProps>(slug && `/api/events/${slug}`, fetcher, {
    dedupingInterval: 30000,
  })

  return {
    event,
    isLoading,
    isError: error,
  }
}
