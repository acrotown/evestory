import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/drizzle";
import { events } from "#/drizzle/schema";

export const PATCH = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  let authHeader = req.headers.get("Authorization");
  let { slug } = params;

  if (authHeader !== `Bearer ${process.env.REVALIDATE_ALL_DATA_TOKEN}`) {
    return Response.json(
      { message: "Unauthorized" },
      {
        status: 401,
      },
    );
  }

  let [event] = await db
    .select({ paymentStatus: events.paymentStatus })
    .from(events)
    .where(eq(events.url, slug));

  if (!event) {
    return Response.json(
      { message: "event not found" },
      {
        status: 404,
      },
    );
  }

  if (event.paymentStatus === "paid") {
    return Response.json(
      { message: "event already paid" },
      {
        status: 400,
      },
    );
  }

  let [res] = await db
    .update(events)
    .set({ paymentStatus: "paid" })
    .where(eq(events.url, slug))
    .returning();

  if (!res?.id) {
    return Response.json(
      { message: "failed to update payment status" },
      {
        status: 500,
      },
    );
  }

  // revalidate all data
  revalidatePath("/", "layout");

  return Response.json(
    { message: "payment status updated", data: res },
    {
      status: 200,
    },
  );
};
