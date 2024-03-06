import { permanentRedirect, redirect } from "next/navigation";

import { constructMetadata } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let title = `${params.slug?.toUpperCase()}`;
  let description = `${params.slug?.toUpperCase()} wedding invitation.`;

  return constructMetadata({
    title,
    description,
  });
}

export default async function Page() {
  return permanentRedirect(`/cover`);
}
