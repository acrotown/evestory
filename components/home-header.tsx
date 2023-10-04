import { AuthNav } from "@/components/auth-nav"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bien-glass"></div>
      <div className="bien-glass-edge"></div>
      <div className="container relative z-50 flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeSwitcher />
          <AuthNav />
        </div>
      </div>
    </header>
  )
}
