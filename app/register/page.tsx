"use client"

import Link from "next/link"
import { signIn } from "next-auth/react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <div className="mt-[calc(30vh)] flex justify-center">
      <Card className="w-[350px]">
        <CardHeader className="flex items-center">
          <CardTitle>Sign up to evestory</CardTitle>
          <CardDescription>Start crafting your events</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => signIn("google")}>
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className=" font-semibold text-muted-foreground hover:text-black dark:hover:text-white"
            >
              Sign in.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
