"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { events } from "#/drizzle/schema";

let schema = z.object({
  slug: z.string(),
  isPublished: z.boolean(),
});

export let togglePublish = action(schema, async (data) => {
  let [res] = await db
    .update(events)
    .set({
      isPublished: data.isPublished,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(events.url, data.slug))
    .returning();

  if (res) {
    revalidatePath("/", "layout");
    return {
      ok: true,
      data: res,
    };
  }

  return {
    ok: false,
    data: null,
  };
});
