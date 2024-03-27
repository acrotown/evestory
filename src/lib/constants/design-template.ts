import {
  BadgeInfoIcon,
  CalendarHeartIcon,
  GiftIcon,
  HeartPulseIcon,
  ImagesIcon,
  MessageSquareHeartIcon,
  UsersIcon,
} from "lucide-react";

import { events } from "#/drizzle/schema";

export let NAVS = [
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
