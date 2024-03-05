"use client";

import { Analytics } from "@vercel/analytics/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useMemo } from "react";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_HOSTNAMES, HOME_HOSTNAMES } from "@/lib/constants";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  let segment = useSelectedLayoutSegment();
  let isAppOrHomeHostname = useMemo(
    () => APP_HOSTNAMES.has(segment || "") || HOME_HOSTNAMES.has(segment || ""),
    [segment],
  );

  return (
    <ThemeProvider
      // If the hostname is not the app or home hostname, do not
      // This is to prevent the dark theme from being applied to the public pages, e.i https://chandler-monica.evestory.day
      attribute={!isAppOrHomeHostname ? undefined : "class"}
      defaultTheme="light"
      disableTransitionOnChange
      storageKey="evestory-theme"
    >
      <PostHogProvider client={posthog}>
        <SessionProvider>
          <TooltipProvider>
            <Toaster />
            {children}
            <Analytics />
          </TooltipProvider>
        </SessionProvider>
      </PostHogProvider>
    </ThemeProvider>
  );
}
