"use client"

import { Analytics } from "@vercel/analytics/react"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"

import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="evestory-theme"
    >
      <SessionProvider>
        <Toaster />
        {children}
        <Analytics />
      </SessionProvider>
    </ThemeProvider>
  )
}
