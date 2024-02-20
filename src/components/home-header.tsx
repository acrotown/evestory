import { AuthNav } from "@/components/auth-nav";
import { HomeNav } from "@/components/home-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bien-glass" />
      <div className="bien-glass-edge" />
      <div className="container relative z-50 flex h-14 items-center">
        <HomeNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSwitcher />
          <AuthNav />
        </div>
      </div>
    </header>
  );
}
