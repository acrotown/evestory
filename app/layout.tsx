import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import { Header } from "@/components/header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { cal, inter } from "@/styles/fonts"

export const metadata = {
  title: "evestory",
  description: "Sharing invitations never this easy!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("min-h-screen bg-background antialiased", [
          cal.variable,
          inter.variable,
        ])}
      >
        <Providers>
          {/* <Header /> */}
          {children}
        </Providers>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
