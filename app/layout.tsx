import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"
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
        className={cn(
          "min-h-screen bg-background antialiased selection:bg-swamp selection:text-solitude dark:selection:bg-governor-bay",
          [cal.variable, inter.variable]
        )}
      >
        <Providers>{children}</Providers>
        <TailwindIndicator />
      </body>
    </html>
  )
}
