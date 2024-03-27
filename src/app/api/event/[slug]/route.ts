import { notFound } from "next/navigation";

import { getCacheEventBySlugForMiddleware } from "@/lib/db/events";

export const GET = async (
  _req: Request,
  { params }: { params: { slug: string } },
) => {
  let slug = params.slug;

  let event = await getCacheEventBySlugForMiddleware(slug);

  if (!event) {
    return notFound();
  }

  return Response.json(event, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
};
