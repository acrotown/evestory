import { Balancer } from "react-wrap-balancer"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Header />

      <section className="pt-32">
        <div className="container flex flex-col items-center gap-2">
          <h1 className="pb-2 font-display text-5xl sm:text-6xl lg:text-7xl">
            <Balancer>Unveil the Magic of Your Love.</Balancer>{" "}
          </h1>

          <h1 className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text pb-2 font-display text-5xl text-transparent sm:text-6xl lg:text-7xl">
            <Balancer>Unveil the Magic of Your Love.</Balancer>
          </h1>

          <h2 className="pb-8 text-2xl text-muted-foreground">
            <Balancer>
              Craft Exquisite Wedding Invitations that Reflect Your Unique Love
              Story.
            </Balancer>
          </h2>
          <div className="flex space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">
              Create an Invitation
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
