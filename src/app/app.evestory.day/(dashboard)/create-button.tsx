"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { useMediaQuery } from "@uidotdev/usehooks";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { APP_DOMAIN, IS_DESKTOP } from "@/lib/constants";

export function CreateButton() {
  let isDesktop = useMediaQuery(IS_DESKTOP);

  return isDesktop ? (
    <Button asChild>
      <Link href={`${APP_DOMAIN}/create`}>Create new event</Link>
    </Button>
  ) : (
    <Button asChild size="icon">
      <Link href={`${APP_DOMAIN}/create`}>
        <PlusIcon />
      </Link>
    </Button>
  );
}
