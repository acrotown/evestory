"use client"

import { useLogSnag } from "@logsnag/next"
import { Crisp } from "crisp-sdk-web"
import { useParams, usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { AppHeader } from "@/components/app-header"
import useEvent from "@/lib/swr/use-event"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pathname = usePathname()
  let { slug } = useParams() as { slug?: string }
  let { setUserId } = useLogSnag()

  let { isError, isLoading } = useEvent()

  React.useEffect(() => {
    Crisp.configure("fb44a81e-9c42-42e6-9597-ecca9a6ea0e6", {
      autoload: true,
    })
  }, [])

  let { data: session } = useSession()
  React.useEffect(() => {
    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email)
      Crisp.user.setNickname(session.user.name || session.user.email)
      setUserId(session.user.email)
    }
  }, [session, setUserId])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        Loading...
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="text-4xl font-bold">Error</div>
        <div className="text-2xl">Something went wrong.</div>
      </div>
    )
  }

  return (
    <>
      <AppHeader slug={slug} pathname={pathname} />
      <div className="relative flex">{children}</div>
    </>
  )
}
