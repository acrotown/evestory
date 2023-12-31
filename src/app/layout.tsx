import "@/styles/globals.css"

import { LogSnagProvider } from "@logsnag/next"

import { Providers } from "@/app/providers"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { cn } from "@/lib/utils"
import { cal, inter } from "@/styles/fonts"

export const metadata = {
  title: "evestory",
  description: "Sharing invitations never this easy.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <LogSnagProvider
          token="c054be8c6a6e470f758018017c910f9a"
          project="evestory"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased selection:bg-swamp selection:text-solitude dark:selection:bg-governor-bay",
          [cal.variable, inter.variable],
        )}
      >
        <Providers>{children}</Providers>
        <TailwindIndicator />
        {/* <button
          data-logsnag-feedback
          data-logsnag-token="<API_TOKEN>"
          data-logsnag-project="<PROJECT>"
          data-logsnag-channel="<CHANNEL>"
        >
          Feedback
        </button>
        <Script
          src="https://cdn.logsnag.com/feedback/ls.js"
          onLoad={() => {
            console.log("loaded")
          }}
        /> */}
      </body>
    </html>
  )
}
