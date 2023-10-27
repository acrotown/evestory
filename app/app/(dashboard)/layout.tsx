"use client"

import { Crisp } from "crisp-sdk-web"
import Link from "next/link"
import {
  useParams,
  usePathname,
  useSelectedLayoutSegments,
} from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import useEvent from "@/lib/swr/use-event"
import { cn } from "@/lib/utils"

const navs = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Design",
    href: "design",
  },
  {
    title: "Guests",
    href: "guests",
  },
  {
    title: "Couple Information",
    href: "couple-information",
  },
  {
    title: "Event Information",
    href: "event-information",
  },
  {
    title: "Gallery",
    href: "gallery",
  },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const segments = useSelectedLayoutSegments()
  const { slug } = useParams() as { slug?: string }

  const { isError, isLoading } = useEvent()

  React.useEffect(() => {
    Crisp.configure("fb44a81e-9c42-42e6-9597-ecca9a6ea0e6", {
      autoload: true,
    })
  }, [])

  const { data: session } = useSession()
  React.useEffect(() => {
    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email)
      Crisp.user.setNickname(session.user.name || session.user.email)
    }
  }, [session])

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
      <AppHeader />
      <div className="flex">
        {segments[0] === "create" || segments[0] === undefined ? (
          <></>
        ) : (
          <aside className="flex min-h-[calc(100vh-56px)] w-[250px] shrink-0 flex-col border-r">
            <div className="flex flex-col space-y-2 px-4 pt-10">
              {navs.map((nav) => (
                <Button
                  key={nav.title}
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname.endsWith(nav.href)
                      ? "bg-accent text-accent-foreground"
                      : "",
                  )}
                >
                  <Link href={`/event/${slug}/${nav.href}`}>{nav.title}</Link>
                </Button>
              ))}
            </div>
          </aside>
        )}

        {children}
      </div>
    </>
  )
}
