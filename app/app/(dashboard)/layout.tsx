"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

  return (
    <>
      <AppHeader />
      <div className="flex">
        <aside className="flex w-[250px] shrink-0 flex-col border-r">
          <div className="flex flex-col space-y-2 px-4 pt-10">
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/overview" || pathname === "/"
                  ? "bg-accent text-accent-foreground"
                  : ""
              )}
            >
              <Link href="/overview">Overview</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/design" ? "bg-accent text-accent-foreground" : ""
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
                  : ""
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
                  : ""
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
                  : ""
              )}
            >
              <Link href="/gallery">Gallery</Link>
            </Button>
          </div>
        </aside>
        {children}
      </div>
    </>
  )
}
