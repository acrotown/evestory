"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { events } from "#/drizzle/schema";

let schema = z.object({
  name: z.enum(events.design.enumValues),
  url: z.string(),
});

export let chooseTemplateAction = action(schema, async (data) => {
  try {
    await db
      .update(events)
      .set({
        design: data.name,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(events.url, data.url));

    revalidatePath("/", "layout");

    return {
      ok: true,
      data: null,
      errors: null,
      message: "Successfully updated design.",
    };
  } catch (err) {
    console.error(err);
    return {
      ok: false,
      data: null,
      errors: {
        message: "Failed to update design.",
      },
      message: "Failed to update design.",
    };
  }
});
