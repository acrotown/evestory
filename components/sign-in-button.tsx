"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"

export function SignInButton() {
  const { data: session, status } = useSession()

  return match([status, session])
    .with(["unauthenticated", P.nullish], () => (
      <Button asChild variant="ghost">
        <Link href="/login">Log in</Link>
      </Button>
    ))
    .otherwise(() => <></>)
}
