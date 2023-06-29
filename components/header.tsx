import { AuthNav } from "@/components/auth-nav"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
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
