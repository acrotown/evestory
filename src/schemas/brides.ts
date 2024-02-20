import { z } from "zod";

export let BridesSchema = z.object({
  id: z.string(),
  name: z
    .string({
      required_error: "Bride name is required.",
    })
    .min(3, {
      message: "Bride name must be at least 3 characters long.",
    }),
  instagramUsername: z.string().optional(),
  photoUrl: z.string().optional(),
  parentsName: z.string().optional(),
  isShowParentsName: z.boolean().default(false),
  eventId: z.string(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});
