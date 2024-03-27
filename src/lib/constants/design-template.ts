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

// import dynamicIconImports from "lucide-react/dynamicIconImports";
import { events } from "#/drizzle/schema";

// TODO: Add more styles
// @ts-expect-error
export let BOTTOM_NAV_STYLES: {
  [key in (typeof events.design.enumValues)[number]]: {
    iconColor: string;
    borderColorClass: string;
    activeClass: string;
    hoverBackgroundColorClass: string;
    backgroundColorClass: string;
  };
} = {
  black: {
    iconColor: "#fff",
    borderColorClass: "border-[#292825]",
    activeClass: "bg-[#292825]",
    hoverBackgroundColorClass: "hover:bg-[#292825]",
    backgroundColorClass: "bg-[#34332f]",
  },
  white: {
    iconColor: "#000",
    borderColorClass: "border-gray-200",
    activeClass: "bg-gray-100",
    hoverBackgroundColorClass: "hover:bg-gray-100",
    backgroundColorClass: "bg-white",
  },
  alabaster: {
    iconColor: "#555650",
    borderColorClass: "border-gray-200",
    activeClass: "bg-gray-100",
    hoverBackgroundColorClass: "hover:bg-gray-100",
    backgroundColorClass: "bg-white",
  },
  ivory: {
    iconColor: "#5E7054",
    borderColorClass: "border-gray-200",
    activeClass: "bg-gray-100",
    hoverBackgroundColorClass: "hover:bg-gray-100",
    backgroundColorClass: "bg-white",
  },
};

export type BottomNavStyles = keyof typeof BOTTOM_NAV_STYLES;
