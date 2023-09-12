"use client"

import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import React from "react"

import { PanelLeftOpen } from "@/components/icons/panel-left-open"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { Logo } from "./icons/logo"

const links = ["Home", "About", "Contact", "Blog"]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <PanelLeftOpen />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <MobileLink
          href="/"
          onOpenChange={setOpen}
          className="flex items-center font-display text-xl"
        >
          <Logo className="mr-2" />
          <span className="relative top-[-2px]">evestory</span>
        </MobileLink>
        <ScrollArea className="my-4">
          <div className="flex flex-col space-y-3">
            {links.map((link) => (
              <MobileLink
                key={link}
                href={`/${link.toLowerCase()}`}
                onOpenChange={setOpen}
                className="text-base font-medium"
              >
                {link}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  children,
  className,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}
