import { cn, constructMetadata } from "@/lib/utils";
import { inter, style_script } from "@/styles/fonts";

import RootWrapper from "../root-wrapper";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let title = `${params.slug}`;
  let description = `${params.slug} wedding invitation.`;

  return constructMetadata({
    title,
    description,
  });
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "bg-[#fff] font-default",
        style_script.variable,
        inter.variable,
      )}
    >
      <RootWrapper>{children}</RootWrapper>
    </div>
  );
}
