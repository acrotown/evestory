"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { subEvents } from "#/drizzle/schema";

let schema = z.object({
  id: z.string(),
});

export let deleteSubEvent = action(schema, async (data) => {
  try {
    let res = await db.delete(subEvents).where(eq(subEvents.id, data.id));

    if (res.rowsAffected === 0) {
      return {
        ok: false,
        data: null,
        errors: {},
        message: "Failed to delete schedule.",
      };
    }

    revalidatePath("/", "layout");
    return {
      ok: true,
      data: null,
      errors: {},
      message: "Schedule deleted successfully.",
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete schedule.");
  }
});
