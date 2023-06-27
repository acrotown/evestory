"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"

export function SignInSignOut() {
  const { data: session, status } = useSession()

  if (status === "loading") return null

  if (session) {
    return (
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    )
  }

  return (
    <Button asChild>
      <Link href="/login">Sign in</Link>
    </Button>
  )
}
