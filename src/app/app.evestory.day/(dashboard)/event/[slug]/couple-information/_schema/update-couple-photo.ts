import { z } from "zod";

import { BridesSchema } from "@/schemas/brides";
import { GroomsSchema } from "@/schemas/grooms";
import { grooms } from "#/drizzle/schema";

export let UpdateCouplePhotoSchema = GroomsSchema.merge(BridesSchema)
  .extend({
    groomId: z.string().default(""),
    groomPhoto: z.string().default(""),
    brideId: z.string().default(""),
    bridePhoto: z.string().default(""),
  })
  .pick({
    groomId: true,
    groomPhoto: true,
    brideId: true,
    bridePhoto: true,
  });

export let UpdateCouplePhotoSchema_ = z.object({
  groomId: z.string().default(""),
  groomPhoto: z.string().default(""),

  brideId: z.string().default(""),
  bridePhoto: z.string().default(""),
});
