"use client"

import { signIn, signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <Button onClick={() => signIn("google")}>Sign in with Google</Button>
      <Button onClick={() => signOut()}>Sign out</Button>
    </>
  )
}
