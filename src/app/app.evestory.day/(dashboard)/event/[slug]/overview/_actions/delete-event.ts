"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { events } from "#/drizzle/schema";

let schema = z.object({
  slug: z.string(),
});

export let deleteEvent = action(schema, async (data) => {
  try {
    let res = await db.delete(events).where(eq(events.url, data.slug));
    if (res.rowsAffected === 0) {
      return {
        ok: false,
        data: null,
        message: "Failed to delete event.",
      };
    }

    revalidatePath("/", "layout");
    return {
      ok: true,
      data: null,
      message: "Event deleted successfully.",
    };
  } catch (error) {
    throw new Error("Failed to delete event.");
  }
});
