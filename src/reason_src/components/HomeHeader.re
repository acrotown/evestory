[@react.component]
let make = () => {
  <header className="sticky top-0 z-40 w-full">
    <div className="bien-flass" />
    <div className="bien-glass-edge" />
    <div className="container relative z-50 flex h-14 items-center">
      <HomeNav />
      "MobileNav"->React.string
      <MobileNav />
      <div className="flex flex-1 items-center justify-end space-x-2">
        <ThemeSwitcher />
        "AuthNav"->React.string
      </div>
    </div>
  </header>;
};
