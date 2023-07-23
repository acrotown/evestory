"use client"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"

export function SignUpButton() {
  const { data: session, status } = useSession()

  return match([status, session])
    .with(["loading", P._], () => <></>)
    .with(["authenticated", P.not(null)], () => (
      <Button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
    ))
    .otherwise(() => (
      <Button asChild>
        <Link
          href={
            process.env.NODE_ENV === "production"
              ? "https://app.evestory.day/register"
              : "http://app.localhost:3000/register"
          }
        >
          Sign up
        </Link>
      </Button>
    ))
}
