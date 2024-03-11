import { constructMetadata } from "@/lib/utils";

import CoverPage from "./cover/page";

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

export default async function Page({ params }: { params: { slug: string } }) {
  return <CoverPage params={params} />;
}
