"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_DOMAIN } from "@/lib/constants";

export function SignUpButton() {
  return (
    <Button asChild>
      <Link href={`${APP_DOMAIN}/register`}>Sign up</Link>
    </Button>
  );
}
