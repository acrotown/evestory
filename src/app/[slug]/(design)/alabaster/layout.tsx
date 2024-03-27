import { notFound } from "next/navigation";

import { BOTTOM_NAV_STYLES } from "@/lib/constants/design-template";
import { getCacheEventBySlugForPublic } from "@/lib/db/events";
import { cn, constructMetadata } from "@/lib/utils";
import { alice, cormorant } from "@/styles/fonts";

import RightSectionWrapper from "../right-section-wrapper";
import RootWrapper from "../root-wrapper";
import { Background } from "./background";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let event = await getCacheEventBySlugForPublic(params.slug);

  let title = `${event.grooms?.name} & ${event.brides?.name} Wedding Invitation | by evestory`;
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
        "font-alice",
        BOTTOM_NAV_STYLES.alabaster.backgroundColorClass,
        alice.variable,
        cormorant.variable,
      )}
    >
      <RootWrapper>
        <RightSectionWrapper BackgroundComponent={Background} event={event}>
          {children}
        </RightSectionWrapper>
      </RootWrapper>
    </div>
  );
}
