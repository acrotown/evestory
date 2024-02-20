"use client";

import { useLogSnag } from "@logsnag/next";
import { Crisp } from "crisp-sdk-web";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import React from "react";

import { AppHeader } from "@/components/app-header";
import useEvent from "@/lib/swr/use-event";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  let pathname = usePathname();
  let { slug } = useParams() as { slug?: string };
  let { setUserId } = useLogSnag();
  let { status, data: session } = useSession();

  React.useEffect(() => {
    Crisp.configure("fb44a81e-9c42-42e6-9597-ecca9a6ea0e6", {
      autoload: true,
    });
  }, []);

  // React.useEffect(() => {
  //   if (user?.primaryEmailAddress?.emailAddress) {
  //     Crisp.user.setEmail(user.primaryEmailAddress.emailAddress)
  //     Crisp.user.setNickname(
  //       user.fullName || user.primaryEmailAddress.emailAddress,
  //     )
  //     setUserId(user.primaryEmailAddress.emailAddress)
  //   }
  // }, [user, setUserId])

  if (status === "loading") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <AppHeader slug={slug} pathname={pathname} />
      <div className="relative flex">{children}</div>
    </>
  );
}
