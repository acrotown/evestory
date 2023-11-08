"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import { match, P } from "ts-pattern"

import { Button } from "@/components/ui/button"
import { APP_DOMAIN } from "@/lib/constants"

export function SignInButton() {
  const { data: session, status } = useSession()

  return match([status, session])
    .with(["unauthenticated", P.nullish], () => (
      <Button asChild variant="ghost">
        <Link href={`${APP_DOMAIN}/login`}>Log in</Link>
      </Button>
    ))
    .otherwise(() => <></>)
}
