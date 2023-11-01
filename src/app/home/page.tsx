import Link from "next/link"
import { Balancer } from "react-wrap-balancer"

import { HomeHeader } from "@/components/home-header"
import { Button } from "@/components/ui/button"
import { APP_DOMAIN } from "@/lib/constants"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HomeHeader />

      <section className="min-h-screen pt-16">
        <div className="container flex flex-col items-center justify-center gap-4">
          <div className="group relative animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-0 running fill-mode-backwards repeat-1">
            <div className="group-hover:duration-10000 absolute inset-0 h-9 animate-tilt rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 px-7 py-5 opacity-75 blur transition duration-1000 group-hover:opacity-100"></div>
            <Button className="relative mb-6 flex items-center rounded-full bg-background text-foreground hover:bg-background">
              <span>Introducing evestory.day 🎉</span>
              <span className="ml-3">&rarr;</span>
            </Button>
          </div>

          <h1 className="pb-2 text-center font-display text-5xl animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-0 running fill-mode-backwards repeat-1 sm:text-6xl lg:text-7xl">
            <Balancer>
              Unveil the{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text pb-1 text-transparent">
                Magic
              </span>{" "}
              of <br />
              <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text p-1 text-transparent">
                Your Love.
              </span>
            </Balancer>{" "}
          </h1>

          <h2 className="pb-8 text-center text-xl text-muted-foreground animate-in fade-in-0 slide-in-from-top-5 duration-1000 delay-300 running fill-mode-backwards repeat-1">
            <Balancer>
              Craft Exquisite Wedding Invitations that Reflect Your Unique Love
              Story.
            </Balancer>
            <br />
            <Balancer>
              Experience Customization, Interactive RSVPs, and Seamless Guest
              Management.
            </Balancer>
          </h2>

          <div className="flex w-full justify-center space-x-4 animate-in fade-in slide-in-from-top-5 duration-1000 delay-700 running fill-mode-backwards repeat-1">
            <Button size="lg" asChild>
              <Link href={`${APP_DOMAIN}/create`}>Get started</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="min-h-screen text-center">Feature Section</section>
      <section className="min-h-screen text-center">Pricing Section</section>
    </main>
  )
}
