open Bindings;
open Components;

[@react.component]
let default = () => {
  <main className="relative flex min-h-screen flex-col">
    <HomeHeader />
    <section className="min-h-screen pt-16">
      <div
        className="container flex flex-col items-center justify-center gap-4">
        <div
          className="group relative animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-0 running fill-mode-backwards repeat-1">
          <div
            className="group-hover:duration-10000 absolute inset-0 h-9 animate-tilt rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-7 py-5 opacity-75 blur transition duration-1000 group-hover:opacity-100"
          />
          <Ui.Button
            className="relative mb-6 flex items-center rounded-full bg-background text-foreground hover:bg-background">
            <span>
              {React.string({js|Introducing evestory.day 🎉|js})}
            </span>
            <span className="ml-3"> {React.string({js|→|js})} </span>
          </Ui.Button>
        </div>
        <h1
          className="pb-2 text-center font-display text-5xl animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-0 running fill-mode-backwards repeat-1 sm:text-6xl lg:text-7xl">
          <Balancer>
            {React.string("Unveil the ")}
            <span
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text pb-1 text-transparent">
              {React.string("Magic")}
            </span>
            {React.string(" ")}
            {React.string("of")}
            <br />
            <span
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text p-1 text-transparent">
              {React.string("Your Love.")}
            </span>
          </Balancer>
        </h1>
        <h2
          className="pb-8 text-center text-xl text-muted-foreground animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-300 running fill-mode-backwards repeat-1">
          <Balancer>
            {React.string(
               "Craft Exquisite Wedding Invitations that Reflect Your Unique Love
              Story.",
             )}
          </Balancer>
          <br />
          <Balancer>
            {React.string(
               "Experience Customization, Interactive RSVPs, and Seamless Guest
              Management.",
             )}
          </Balancer>
        </h2>
        <div
          className="flex w-full justify-center space-x-4 animate-in fade-in slide-in-from-top-5 duration-1000 delay-700 running fill-mode-backwards repeat-1">
          <Ui.Button size=`lg asChild=true>
            <Next.Link href={Constants.app_domain ++ "/create"}>
              {React.string("Get started")}
            </Next.Link>
          </Ui.Button>
        </div>
      </div>
    </section>
    <section className="min-h-screen text-center">
      {React.string("Feature Section")}
    </section>
    <section className="min-h-screen text-center">
      {React.string("Pricing Section")}
    </section>
  </main>;
};
