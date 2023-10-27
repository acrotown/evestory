import { z } from "zod"

export const CreateEventSchema = z.object({
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
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  eventName: z
    .string({
      required_error: "Event name is required.",
    })
    .min(3, {
      message: "Event name must be at least 3 characters long.",
    }),
  websiteURL: z
    .string({
      required_error: "Website URL is required.",
    })
    .min(3, {
      message: "Website URL must be at least 3 characters long.",
    }),
})
