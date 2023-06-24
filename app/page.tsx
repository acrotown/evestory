"use client"

import { signOut } from "next-auth/react"

import ThemeSwitcher from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex h-[60vh] flex-col items-center justify-between p-24">
      <ThemeSwitcher />

      <h1 className="text-7xl">evestory</h1>
      <Button onClick={() => signOut()}>Sign out</Button>
    </main>
  )
}
