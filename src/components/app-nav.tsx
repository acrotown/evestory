"use client";

import { SlashIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Logo } from "./icons/logo";

export function AppNav() {
  const { slug } = useParams();
  return (
    <div className="hidden md:flex md:items-center md:justify-center">
      <Link
        href="/"
        className="mr-2 flex items-center justify-center font-display text-xl"
      >
        <Logo className="mr-2" />
        <span className="relative top-[-2px]">evestory</span>
      </Link>
      {!slug ? null : <SlashIcon className="mr-2 opacity-20" />}
      <div className="relative top-[-1px] font-display text-xl">{slug}</div>
      <nav className="flex items-center space-x-6 text-sm font-medium"></nav>
    </div>
  );
}
