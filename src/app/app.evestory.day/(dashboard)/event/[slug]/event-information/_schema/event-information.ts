import { z } from "zod";

import { EventsSchema } from "@/schemas/events";

export let EventInformationSchema_ = z.object({
  eventId: z.string(),
  eventName: z
    .string({
      required_error: "Wedding name is required.",
    })
    .min(3, {
      message: "Wedding name must be at least 3 characters long.",
    }),
  description: z.string().default("").optional(),
  websiteURL: z
    .string({
      required_error: "Website URL is required.",
    })
    .min(3, {
      message: "Website URL must be at least 3 characters long.",
    }),
});

export let UpdateEventInformationSchema = EventsSchema.pick({
  id: true,
  name: true,
  description: true,
  url: true,
  date: true,
});
