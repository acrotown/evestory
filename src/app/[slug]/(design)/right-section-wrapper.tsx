"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { getCacheEventBySlugForPublic } from "@/lib/db/events";

import { BottomNav } from "./bottom-nav";

export default function RightSectionWrapper({
  children,
  event,
  BackgroundComponent,
}: {
  children: React.ReactNode;
  event: Awaited<ReturnType<typeof getCacheEventBySlugForPublic>>;
  BackgroundComponent: React.ComponentType;
}) {
  let pathname = usePathname();
  let [key, setKey] = useState(0);

  useEffect(() => {
    // Reset key to re-render Background component
    setKey(key + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="relative">
      <div className="relative h-[100svh]">
        <BackgroundComponent key={key} />

        <div className="relative z-20 h-full overflow-auto scrollbar-hide max-lg:mx-4">
          {children}
        </div>
      </div>

      <BottomNav design={event.design} />
    </div>
  );
}
