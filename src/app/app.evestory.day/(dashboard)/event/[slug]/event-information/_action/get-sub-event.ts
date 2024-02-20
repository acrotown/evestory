"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/drizzle";
import { subEvents } from "#/drizzle/schema";

export async function getSubEvent(subEventId: string) {
  let [res] = await db
    .select()
    .from(subEvents)
    .where(eq(subEvents.id, subEventId));

  return res;
}
