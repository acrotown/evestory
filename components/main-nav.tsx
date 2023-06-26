import Link from "next/link"

export function MainNav() {
  return (
    <div className="hidden md:flex">
      <Link href="/" className="mr-6 flex items-center font-display text-xl">
        evestory
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/blog">Blog</Link>
      </nav>
    </div>
  )
}
