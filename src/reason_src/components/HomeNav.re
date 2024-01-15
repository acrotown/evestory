open Bindings;
[@react.component]
let make = () => {
  <div className="hidden md:flex">
    <Next.Link
      href="/"
      className="mr-6 flex items-center justify-center font-display text-xl">
      // <Logo className="mr-2" />

        <span className="relative top-[-2px]">
          {React.string("evestory")}
        </span>
      </Next.Link>
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Next.Link href="/about"> "About"->React.string </Next.Link>
      <Next.Link href="/contact"> "Contact"->React.string </Next.Link>
      <Next.Link href="/blog"> "Blog"->React.string </Next.Link>
    </nav>
  </div>;
};
