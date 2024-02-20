"use client";

import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider, useTheme } from "next-themes";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { Toaster } from "@/components/ui/toaster";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="evestory-theme"
    >
      <PostHogProvider client={posthog}>
        <SessionProvider>
          <Toaster />
          {children}
          <Analytics />
        </SessionProvider>
      </PostHogProvider>
    </ThemeProvider>
  );
}
