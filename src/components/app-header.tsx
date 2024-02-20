import Link from "next/link";

import { AuthNav } from "@/components/auth-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { AppNav } from "./app-nav";

const navs = [
  {
    title: "Overview",
    href: "overview",
  },
  {
    title: "Design",
    href: "design",
  },
  {
    title: "Guests",
    href: "guests",
  },
  {
    title: "Couple Information",
    href: "couple-information",
  },
  {
    title: "Event Information",
    href: "event-information",
  },
  {
    title: "Gallery",
    href: "gallery",
  },
];

const navsRoot = [
  {
    title: "Overview",
    href: "",
  },
];

export function AppHeader({
  slug,
  pathname,
}: {
  slug: string | undefined;
  pathname: string;
}) {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bien-glass" />
      <div className="bien-glass-edge" />
      <div className="relative flex h-14 items-center px-6">
        <AppNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSwitcher />
          <AuthNav />
        </div>
      </div>
      <div className="m-auto flex max-w-full overflow-auto scrollbar-hide">
        <div className="flex shrink-0 grow items-center">
          <NavigationMenu className="px-3">
            <NavigationMenuList>
              {(!slug ? navsRoot : navs).map((nav) => {
                return (
                  <NavigationMenuItem key={nav.title}>
                    <Link
                      href={!slug ? `/` : `/event/${slug}/${nav.href}`}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname.endsWith(nav.href)
                            ? "rounded-none text-accent-foreground"
                            : "text-muted-foreground/80",
                        )}
                      >
                        <div
                          className={cn(
                            "rounded-sm px-2 py-1 hover:bg-accent hover:text-accent-foreground",
                            pathname.endsWith(nav.href)
                              ? "underline decoration-accent-foreground underline-offset-[16px]"
                              : "",
                          )}
                        >
                          {nav.title}
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
}
