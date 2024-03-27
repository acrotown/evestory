"use client";

import { motion } from "framer-motion";
import {
  BadgeInfoIcon,
  CalendarHeartIcon,
  GiftIcon,
  HeartPulseIcon,
  ImagesIcon,
  LucideIcon,
  MessageSquareHeartIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// import Icon from "@/components/icons/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BOTTOM_NAV_STYLES } from "@/lib/constants/design-template";
import { cn, generateNavs } from "@/lib/utils";
import { events } from "#/drizzle/schema";

export let NAVS: Array<{
  // icon: keyof typeof dynamicIconImports;
  icon: LucideIcon;
  label: string;
  path: string;
}> = [
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

export function BottomNav({
  className,
  design,
}: {
  className?: string;
  design: (typeof events.design.enumValues)[number];
}) {
  let [activeTab, setActiveTab] = useState("");
  let path = usePathname();
  let { slug } = useParams() as { slug: string };

  let navs = generateNavs(path, slug);
  let bottomNavStyles = BOTTOM_NAV_STYLES[design];

  useEffect(() => {
    let currentActiveTab = navs.find((nav, index) => {
      if (index === 0 || path === `/event/${slug}/preview` || path === "/") {
        return true;
      }

      return path === nav.path;
    })?.label;

    if (currentActiveTab) {
      setActiveTab(currentActiveTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={cn(
        `absolute inset-x-0 bottom-4 z-50 mx-auto h-14 max-w-lg overflow-x-auto rounded-full border font-sans shadow-md scrollbar-hide`,
        bottomNavStyles?.borderColorClass,
        bottomNavStyles?.backgroundColorClass,
        className,
      )}
    >
      <div className="grid h-full max-w-lg grid-flow-col">
        {navs.map((nav) => {
          return (
            <Tooltip key={nav.label}>
              <TooltipTrigger asChild>
                <Link
                  href={nav.path}
                  onClick={() => setActiveTab(nav.label)}
                  className={cn(
                    `relative inline-flex flex-col items-center justify-center`,
                    activeTab === nav.label
                      ? ""
                      : bottomNavStyles.hoverBackgroundColorClass,
                  )}
                >
                  {activeTab === nav.label && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        bounce: 0.2,
                      }}
                      className={cn(
                        `absolute inset-0`,
                        bottomNavStyles?.activeClass,
                      )}
                    />
                  )}
                  <motion.div
                    className="z-10 flex h-full items-center px-5"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {/* <Icon
                      name={nav.icon}
                      className="h-6 w-6"
                      color={bottomNavStyles.iconColor}
                    /> */}
                    <nav.icon
                      className="h-6 w-6"
                      color={bottomNavStyles.iconColor}
                    />
                  </motion.div>
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
