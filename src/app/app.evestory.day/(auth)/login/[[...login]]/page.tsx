"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const [isGoogleClicked, setIsGoogleClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // const res = await fetch("/api/auth/account-exists", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      // const { exists } = await res.json();
      let exists = true;
      if (exists) {
        const res = await signIn("email", {
          email,
          redirect: false,
          ...(redirect && redirect.length > 0 ? { callbackUrl: redirect } : {}),
        });
        if (res?.ok && !res?.error) {
          toast("Email sent - check you inbox!");
        } else {
          // TODO: Handle error when user is exists
          toast.error("Error sending email - try again?");
        }
      } else {
        toast.error("No account found with that email address.");
      }
    } catch (err) {
      toast.error("Error sending email - try again?");
    } finally {
      setIsLoading(false);
      setEmail("");
    }
  };

  return (
    <div className="flex justify-center pt-[calc(30vh)]">
      <Card className="w-[350px]">
        <CardHeader className="flex items-center">
          <CardTitle>Log in to evestory</CardTitle>
          <CardDescription>Start crafting your events</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <form onSubmit={(e) => handleEmailSubmit(e)}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="chandler@bing.com"
                  type="email"
                  value={email}
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <ReloadIcon className="mr-2 animate-spin" />}
                Log In with Email
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button
            disabled={isGoogleClicked || isLoading}
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsGoogleClicked(true);
              signIn("google", {
                ...(redirect && redirect.length > 0
                  ? { callbackUrl: redirect }
                  : {}),
              });
            }}
          >
            {isGoogleClicked ? (
              <>
                <ReloadIcon className="mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <Google className="mr-2" />
                Google
              </>
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className={cn(
                "font-semibold text-muted-foreground hover:text-black dark:hover:text-white",
                isLoading ? "pointer-events-none" : "",
              )}
            >
              Sign up.
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
