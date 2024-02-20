import { z } from "zod";

import { BridesSchema } from "@/schemas/brides";
import { EventsSchema } from "@/schemas/events";
import { GroomsSchema } from "@/schemas/grooms";

export let CreateEventSchema = EventsSchema.merge(GroomsSchema)
  .merge(BridesSchema)
  .extend({
    eventName: z
      .string({
        required_error: "Wedding name is required.",
      })
      .min(3, {
        message: "Wedding name must be at least 3 characters long.",
      }),
    groomName: z
      .string({
        required_error: "Groom name is required.",
      })
      .min(3, {
        message: "Groom name must be at least 3 characters long.",
      }),
    brideName: z
      .string({
        required_error: "Bride name is required.",
      })
      .min(3, {
        message: "Bride name must be at least 3 characters long.",
      }),
  })
  .pick({
    eventName: true,
    groomName: true,
    brideName: true,
    date: true,
    url: true,
  });
