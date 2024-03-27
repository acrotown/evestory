import { notFound } from "next/navigation";

import { BOTTOM_NAV_STYLES } from "@/lib/constants/design-template";
import { getCacheEventBySlugForPublic } from "@/lib/db/events";
import { cn, constructMetadata } from "@/lib/utils";
import { dr_sugiyama, inter } from "@/styles/fonts";

import RightSectionWrapper from "../right-section-wrapper";
import RootWrapper from "../root-wrapper";
import { Background } from "./background";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let event = await getCacheEventBySlugForPublic(params.slug);

  let title = `${event.grooms?.name} & ${event.brides?.name} Wedding Invitation | evestory`;
  let description = `${params.slug} wedding invitation.`;

  return constructMetadata({
    title,
    description,
  });
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  let event = await getCacheEventBySlugForPublic(params.slug);

  if (!event) {
    return notFound();
  }

  return (
    <div
      className={cn(
        "font-default",
        BOTTOM_NAV_STYLES.black.backgroundColorClass,
        dr_sugiyama.variable,
        inter.variable,
      )}
    >
      <RootWrapper coverImage="https://wsrv.nl/?url=https://images.unsplash.com/photo-1710587384959-3541e5e27999?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <RightSectionWrapper BackgroundComponent={Background} event={event}>
          {children}
        </RightSectionWrapper>
      </RootWrapper>
    </div>
  );
}
