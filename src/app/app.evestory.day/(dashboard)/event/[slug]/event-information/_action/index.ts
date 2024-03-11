"use server";

import { and, eq, not } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { events } from "#/drizzle/schema";

import { UpdateEventInformationSchema } from "../_schema/event-information";

export let updateEventInfo = action(
  UpdateEventInformationSchema,
  async (data) => {
    let [urlExist] = await db
      .select()
      .from(events)
      .where(and(eq(events.url, data.url), not(eq(events.id, data.id))));

    if (urlExist) {
      return {
        ok: false,
        data: null,
        errors: {
          url: ["Website URL already exists."],
        },
        message: "Website URL already exists.",
      };
    }

    let res = await db
      .update(events)
      .set({
        name: data.name,
        description: data.description,
        url: data.url,
        date: data.date.toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      })
      .where(eq(events.id, data.id));

    revalidateTag("events");
    revalidateTag("event");

    return {
      ok: true,
      data: res,
      errors: {},
      message: "Event information updated successfully.",
    };
  },
);
