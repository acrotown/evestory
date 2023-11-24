import { z } from "zod"

export let CreateEventSchema = z.object({
  groomName: z
    .string({
      required_error: "Groom name is required.",
    })
    .nonempty({
      message: "Groom name is required.",
    })
    .min(3, {
      message: "Groom name must be at least 3 characters long.",
    }),
  brideName: z
    .string({
      required_error: "Bride name is required.",
    })
    .nonempty({
      message: "Bride name is required.",
    })
    .min(3, {
      message: "Bride name must be at least 3 characters long.",
    }),
  eventDate: z.date({
    required_error: "Event date is required.",
  }),
  eventName: z
    .string({
      required_error: "Wedding name is required.",
    })
    .nonempty({
      message: "Wedding name is required.",
    })
    .min(3, {
      message: "Wedding name must be at least 3 characters long.",
    }),
  websiteURL: z
    .string({
      required_error: "Website URL is required.",
    })
    .nonempty({
      message: "Website URL is required.",
    })
    .min(3, {
      message: "Website URL must be at least 3 characters long.",
    }),
})
