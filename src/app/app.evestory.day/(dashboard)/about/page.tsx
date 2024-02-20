import { HomeHeader } from "@/components/home-header";

export default function About() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HomeHeader />

      <section className="pt-10">
        <div className="container">
          <h1>About Page</h1>
        </div>
      </section>
    </main>
  );
}
