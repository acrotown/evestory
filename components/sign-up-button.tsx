"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"
import { APP_DOMAIN } from "@/lib/constants"

export function SignUpButton() {
  const { data: session, status } = useSession()

  return match([status, session])
    .with(["loading", P._], () => <></>)
    .with(["authenticated", P.not(null)], () => (
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    ))
    .otherwise(() => (
      <Button asChild>
        <Link href={`${APP_DOMAIN}/register`}>Sign up</Link>
      </Button>
    ))
}
