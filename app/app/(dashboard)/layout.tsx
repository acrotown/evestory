"use client"

import { Crisp } from "crisp-sdk-web"
import Link from "next/link"
import { usePathname, useSelectedLayoutSegments } from "next/navigation"
import { useSession } from "next-auth/react"
import React from "react"

import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const segments = useSelectedLayoutSegments()

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

  return (
    <>
      <AppHeader />
      <div className="flex">
        {segments[0] !== "create" ? (
          <aside className="flex min-h-[calc(100vh-56px)] w-[250px] shrink-0 flex-col border-r">
            <div className="flex flex-col space-y-2 px-4 pt-10">
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/overview" || pathname === "/"
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
              >
                <Link href="/overview">Overview</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/design"
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
              >
                <Link href="/design">Design</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/couple-information"
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
              >
                <Link href="/couple-information">Couple Information</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/event-information"
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
              >
                <Link href="/event-information">Event Information</Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  pathname === "/gallery"
                    ? "bg-accent text-accent-foreground"
                    : "",
                )}
              >
                <Link href="/gallery">Gallery</Link>
              </Button>
            </div>
          </aside>
        ) : (
          <></>
        )}

        {children}
      </div>
    </>
  )
}
