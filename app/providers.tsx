"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider, useTheme } from "next-themes"

import { Toaster } from "@/components/ui/toaster"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <Toaster />
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}
