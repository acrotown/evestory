import { Header } from "@/components/header"

export default function Dashboard() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Header />

      <section className="pt-16">
        <div className="container">
          <h1>Dashboard Page</h1>
        </div>
      </section>
    </main>
  )
}