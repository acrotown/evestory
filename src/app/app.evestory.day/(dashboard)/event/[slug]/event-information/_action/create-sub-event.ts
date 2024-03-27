"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { subEvents } from "#/drizzle/schema";

import { CreateOrUpdateSubEventSchema } from "../_schema/create-sub-event";

export let createSubEvent = action(
  CreateOrUpdateSubEventSchema,
  async (data) => {
    let startDate = new Date(data.date);
    let [startHour, startMinute] = data.startTime.split(":");
    startDate.setHours(Number(startHour), Number(startMinute), 0, 0);

    let endDate = new Date(data.date);
    let [endHour, endMinute] = data.endTime.split(":");
    endDate.setHours(Number(endHour), Number(endMinute), 0, 0);

    if (data.eventId === undefined) {
      return {
        ok: false,
        data: null,
        errors: {},
        message: "Event ID is required.",
      };
    }

    let [res] = await db
      .insert(subEvents)
      .values({
        eventId: data.eventId,
        name: data.name,
        description: data.description,
        date: data.date.toISOString(),
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        location: data.location,
        address: data.address,
      })
      .returning();

    if (res?.id) {
      revalidatePath("/", "layout");
      return {
        ok: true,
        data: res,
        errors: {},
        message: "Schedule created successfully.",
      };
    }

    return {
      ok: false,
      data: null,
      errors: {},
      message: "Failed to create schedule.",
    };
  },
);
