import { z } from "zod";

export let EventsSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Wedding name is required.",
    })
    .min(3, {
      message: "Wedding name must be at least 3 characters long.",
    }),
  description: z.string().default("").optional(),
  url: z
    .string({
      required_error: "Website URL is required.",
    })
    .min(3, {
      message: "Website URL must be at least 3 characters long.",
    }),
  date: z.date({
    required_error: "Event date is required.",
  }),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
  isPublished: z.boolean().default(false),
  isShowGroomNameFirst: z.boolean().default(false),
  userId: z.string(),
});
