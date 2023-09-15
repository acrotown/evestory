"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { useState } from "react"

import { Google } from "@/components/icons/google"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { APP_DOMAIN } from "@/lib/constants"

export default function Page() {
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect")
  const [isGoogleClicked, setIsGoogleClicked] = useState(false)

  return (
    <div className="mt-[calc(30vh)] flex justify-center">
      <Card className="w-[350px]">
        <CardHeader className="flex items-center">
          <CardTitle>Sign up to evestory</CardTitle>
          <CardDescription>Start crafting your events</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            disabled={isGoogleClicked}
            className="w-full"
            onClick={() => {
              setIsGoogleClicked(true)
              signIn("google", {
                ...(redirect && redirect.length > 0
                  ? { callbackUrl: redirect }
                  : {}),
              })
            }}
          >
            {isGoogleClicked ? (
              <>
                <ReloadIcon className="mr-2 animate-spin" />
                Signing up...
              </>
            ) : (
              <>
                <Google className="mr-2" />
                Continue with Google
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={`${APP_DOMAIN}/login`}
              className=" font-semibold text-muted-foreground hover:text-black dark:hover:text-white"
            >
              Log in.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
