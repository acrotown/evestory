"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_DOMAIN } from "@/lib/constants";

export function SignInButton() {
  return (
    <Button asChild variant="ghost">
      <Link href={`${APP_DOMAIN}/login`}>Log in</Link>
    </Button>
  );
}
