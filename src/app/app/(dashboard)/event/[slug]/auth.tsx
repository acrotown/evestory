"use client"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import useEvent from "@/lib/swr/use-event"

export default function EventAuth({ children }: { children: React.ReactNode }) {
  const { isLoading, isError } = useEvent()

  if (isLoading) {
    return <div className="flex">Loading...</div>
  }

  if (isError) {
    return (
      <MaxWidthWrapper>
        <div className="flex h-screen w-full flex-col items-center justify-center">
          <div className="text-4xl font-bold">Error</div>
          <div className="text-2xl">Something went wrong.</div>
        </div>
      </MaxWidthWrapper>
    )
  }

  return children
}
