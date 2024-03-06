"use client";

import {
  BadgeInfoIcon,
  CalendarHeartIcon,
  GiftIcon,
  HeartPulseIcon,
  ImagesIcon,
  MessageSquareHeartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

let navs = [
  {
    icon: BadgeInfoIcon,
    label: "Cover",
    path: "/cover",
  },
  {
    icon: UsersIcon,
    label: "Couple",
    path: "/couple",
  },
  {
    icon: CalendarHeartIcon,
    label: "Event",
    path: "/event",
  },
  {
    icon: MessageSquareHeartIcon,
    label: "Wishes",
    path: "/wishes",
  },
  {
    icon: HeartPulseIcon,
    label: "Stories",
    path: "/stories",
  },
  {
    icon: ImagesIcon,
    label: "Galleries",
    path: "/galleries",
  },
  {
    icon: GiftIcon,
    label: "Gift",
    path: "/gift",
  },
];

export function BottomNav() {
  let path = usePathname();
  console.log("path", path);

  return (
    <div className="absolute inset-x-0 bottom-4 mx-auto h-16 max-w-lg overflow-x-auto rounded-full border border-gray-200 bg-white font-sans shadow-md scrollbar-hide dark:border-gray-600 dark:bg-gray-700">
      <div className="grid h-full max-w-lg grid-flow-col">
        {navs.map((nav, index) => {
          return (
            <Tooltip key={nav.label}>
              <TooltipTrigger asChild>
                <Link
                  href={nav.path}
                  className={cn(
                    "group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 dark:hover:bg-gray-800",
                    [
                      index === 0 ? "rounded-s-full" : "",
                      index === navs.length - 1 ? "rounded-e-full" : "",
                      path === nav.path ? "bg-gray-100 dark:bg-gray-800" : "",
                      index === 0 && path === "/"
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "",
                    ],
                  )}
                >
                  <nav.icon className="h-6 w-6" color="#555650" />
                </Link>
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
