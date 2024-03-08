"use server";

import { format } from "date-fns";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { CreateEventSchema } from "@/app/app.evestory.day/(dashboard)/create/_schema/create-event.schema";
import { getSession } from "@/lib/auth";
import { db } from "@/lib/drizzle";
import { logsnag } from "@/lib/logsnag";
import { action } from "@/lib/safe-action";
import { brides, events, grooms } from "#/drizzle/schema";

export let createEvent = action(CreateEventSchema, async (data) => {
  let { user } = await getSession();

  try {
    let [urlExist] = await db
      .select()
      .from(events)
      .where(eq(events.url, data.url));

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

    let event = await db.transaction(async (tx) => {
      console.log("Creating event");
      console.log(data.date);
      console.log(data.date.toISOString());
      let [event] = await tx
        .insert(events)
        .values({
          name: data.eventName,
          url: data.url,
          date: data.date.toISOString(),
          userId: user.id,
        })
        .returning({
          id: events.id,
          name: events.name,
          url: events.url,
          date: events.date,
        });

      if (!event?.id) {
        await tx.rollback();
        return;
      }

      let [groom] = await tx
        .insert(grooms)
        .values({
          name: data.groomName,
          eventId: event.id,
        })
        .returning({ id: grooms.id });
      if (!groom?.id) {
        await tx.rollback();
        return;
      }

      let [bride] = await tx
        .insert(brides)
        .values({
          name: data.brideName,
          eventId: event.id,
        })
        .returning({ id: brides.id });
      if (!bride?.id) {
        await tx.rollback();
        return;
      }

      return event;
    });

    if (event && process.env.NODE_ENV === "production") {
      await logsnag.track({
        channel: "create-events",
        event: "Event Created",
        description: `${user.email} created an event - ${event.name}`,
        icon: "🎉",
        tags: {
          event_id: event.id,
          event_name: event.name,
          event_url: event.url,
          event_date: format(new Date(event.date), "PPP"),
          event_user_id: user.id,
        },
        notify: true,
      });
    }

    revalidateTag("events");
    revalidateTag("event");

    return {
      data: event,
      ok: true,
      message: "Event created successfully.",
      errors: null,
    };
  } catch (err) {
    return {
      errors: err,
      data: undefined,
      message: "Failed to create event.",
      ok: false,
    };
  }
});
