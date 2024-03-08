import "@/styles/globals.css";

import { LogSnagProvider } from "@logsnag/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "@/app/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { cal, dr_sugiyama, inter } from "@/styles/fonts";

export const metadata = {
  title: "evestory",
  description: "Sharing invitations never this easy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          "overflow-x-hidden bg-background antialiased selection:bg-governor-bay selection:text-solitude",
          [cal.variable, inter.variable],
        )}
      >
        <Providers>{children}</Providers>
        <SpeedInsights />
        <TailwindIndicator />
      </body>
    </html>
  );
}
