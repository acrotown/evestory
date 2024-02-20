"use server";

import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { db } from "@/lib/drizzle";
import { action } from "@/lib/safe-action";
import { brides, events, grooms } from "#/drizzle/schema";

import { CoupleInformationSchema } from "../_schema/update-couple-information";
import { UpdateCouplePhotoSchema } from "../_schema/update-couple-photo";

export let updateCoupleInformation = action(
  CoupleInformationSchema,
  async (data) => {
    try {
      let groom = db
        .update(grooms)
        .set({
          name: data.groomName,
          instagramUsername: data.groomInstagram,
          parentsName: data.groomParentsName,
          isShowParentsName: data.isShowGroomParentsName,
        })
        .where(eq(grooms.id, data.groomId));

      let bride = db
        .update(brides)
        .set({
          name: data.brideName,
          instagramUsername: data.brideInstagram,
          parentsName: data.brideParentsName,
          isShowParentsName: data.isShowBrideParentsName,
        })
        .where(eq(brides.id, data.brideId));

      let event = db
        .update(events)
        .set({
          isShowGroomNameFirst: data.isShowGroomNameFirst,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(events.id, data.eventId));

      let batch = await db.batch([groom, bride, event]);

      revalidateTag("events");
      revalidateTag("event");

      return {
        ok: true,
        data: JSON.stringify(batch),
        errors: null,
        message: "Successfully updated event.",
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        data: null,
        errors: {
          message: "Error updating event.",
        },
        message: "Error updating event.",
      };
    }
  },
);

export let updatePhoto = action(UpdateCouplePhotoSchema, async (data) => {
  if (data.groomPhoto && data.groomId) {
    let [groom] = await db
      .update(grooms)
      .set({
        photoUrl: data.groomPhoto,
      })
      .where(eq(grooms.id, data.groomId))
      .returning({
        groomPhotoUrl: grooms.photoUrl,
      });

    revalidateTag("events");
    revalidateTag("event");
    return {
      ok: true,
      data: groom,
      errors: null,
      message: "Groom photo updated.",
    };
  }

  if (data.bridePhoto && data.brideId) {
    let [bride] = await db
      .update(brides)
      .set({
        photoUrl: data.bridePhoto,
      })
      .where(eq(brides.id, data.brideId))
      .returning({
        bridePhotoUrl: brides.photoUrl,
      });

    revalidateTag("events");
    revalidateTag("event");

    return {
      ok: true,
      data: bride,
      errors: null,
      message: "Bride photo updated.",
    };
  }

  return {
    ok: false,
    data: null,
    errors: {
      message: "Error updating photo.",
    },
    message: "Error updating photo.",
  };
});
