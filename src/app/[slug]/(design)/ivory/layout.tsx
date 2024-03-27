import { notFound } from "next/navigation";

import { BOTTOM_NAV_STYLES } from "@/lib/constants/design-template";
import { getCacheEventBySlugForPublic } from "@/lib/db/events";
import { cn, constructMetadata } from "@/lib/utils";
import { inter, style_script } from "@/styles/fonts";

import RightSectionWrapper from "../right-section-wrapper";
import RootWrapper from "../root-wrapper";
import { Background } from "./background";
import { BackgroundSpring } from "./background-spring";

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

  let animation = "default";

  return (
    <div
      className={cn(
        "font-default",
        BOTTOM_NAV_STYLES.ivory.backgroundColorClass,
        style_script.variable,
        inter.variable,
      )}
    >
      <RootWrapper>
        <RightSectionWrapper
          BackgroundComponent={animation ? Background : BackgroundSpring}
          event={event}
        >
          {children}
        </RightSectionWrapper>
      </RootWrapper>
    </div>
  );
}
