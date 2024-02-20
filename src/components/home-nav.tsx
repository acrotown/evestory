import Link from "next/link";

import { Logo } from "./icons/logo";

export function HomeNav() {
  return (
    <div className="hidden md:flex">
      <Link
        href="/"
        className="mr-6 flex items-center justify-center font-display text-xl"
      >
        <Logo className="mr-2" />
        <span className="relative top-[-2px]">evestory</span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </div>
  );
}
