"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"

export function SignInButton() {
  const { data: session, status } = useSession()

  return match([status, session])
    .with(["unauthenticated", P.nullish], () => (
      <Button asChild variant="ghost">
        <Link
          href={
            process.env.NODE_ENV === "production"
              ? "https://app.evestory.day/login"
              : "http://app.localhost:3000/login"
          }
        >
          Log in
        </Link>
      </Button>
    ))
    .otherwise(() => <></>)
}
