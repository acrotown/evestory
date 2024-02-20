import { z } from "zod";

export let SubEventsSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Schedule name is required.",
    })
    .min(3, {
      message: "Schedule name must be at least 3 characters long.",
    }),
  description: z.string().default("").optional(),
  date: z.date({
    required_error: "Schedule date is required.",
  }),
  endTime: z.string({
    required_error: "End time is required.",
  }),
  startTime: z.string({
    required_error: "Start time is required.",
  }),
  address: z.string().default("").optional(),
  eventId: z.string(),
  location: z.string().default("").optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});
