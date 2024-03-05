"use client";

import {
  CalendarHeartIcon,
  GiftIcon,
  HeartPulseIcon,
  ImagesIcon,
  MessageSquareHeartIcon,
  UsersIcon,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function BottomNav() {
  let navs = [
    {
      icon: UsersIcon,
      label: "Couple",
    },
    {
      icon: CalendarHeartIcon,
      label: "Event",
    },
    {
      icon: MessageSquareHeartIcon,
      label: "Wishes",
    },
    {
      icon: HeartPulseIcon,
      label: "Stories",
    },
    {
      icon: ImagesIcon,
      label: "Galleries",
    },
    {
      icon: GiftIcon,
      label: "Gift",
    },
  ];

  return (
    <div className="absolute inset-x-0 bottom-4 mx-auto h-16 max-w-lg overflow-x-auto rounded-full border border-gray-200 bg-white font-sans shadow-md scrollbar-hide dark:border-gray-600 dark:bg-gray-700">
      <div className="grid h-full max-w-lg grid-flow-col">
        {navs.map((nav, index) => {
          return (
            <Tooltip key={nav.label}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 dark:hover:bg-gray-800",
                    [
                      index === 0 ? "rounded-s-full" : "",
                      index === navs.length - 1 ? "rounded-e-full" : "",
                    ],
                  )}
                >
                  <nav.icon className="h-6 w-6" color="#555650" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{nav.label}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
