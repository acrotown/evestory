import "@/styles/globals.css"

import { Providers } from "@/app/providers"
import Background from "@/components/background"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { cn } from "@/lib/utils"
import { cal, inter } from "@/styles/fonts"

export const metadata = {
  title: "Evestory",
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
          <Background>{children}</Background>
        </Providers>
        <TailwindIndicator />
      </body>
    </html>
  )
}
