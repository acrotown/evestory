import { z } from "zod"

export const CoupleInformationSchema = z
  .object({
    eventName: z
      .string({
        required_error: "Wedding name is required.",
      })
      .min(3, {
        message: "Wedding name must be at least 3 characters long.",
      }),
    description: z.string().default("").optional(),
    isShowGroomNameFirst: z.boolean().default(true),
    groomName: z
      .string({
        required_error: "Groom name is required.",
      })
      .min(3, {
        message: "Groom name must be at least 3 characters long.",
      }),
    groomPhoto: z.string().default(""),
    groomInstagram: z.string().default(""),
    isShowGroomParentsName: z.boolean().default(true),
    groomParentsName: z.string().default(""),
    brideName: z
      .string({
        required_error: "Bride name is required.",
      })
      .min(3, {
        message: "Bride name must be at least 3 characters long.",
      }),
    bridePhoto: z.string().default(""),
    brideInstagram: z.string().default(""),
    isShowBrideParentsName: z.boolean().default(true),
    brideParentsName: z.string().default(""),
    websiteURL: z
      .string({
        required_error: "Website URL is required.",
      })
      .min(3, {
        message: "Website URL must be at least 3 characters long.",
      }),
  })
  .superRefine((data, ctx) => {
    console.log(data, ctx)
    if (data.isShowGroomParentsName && !data.groomParentsName) {
      ctx.addIssue({
        code: "custom",
        message: "Groom parents name is required.",
        path: ["groomParentsName"],
      })
    }
    if (data.isShowBrideParentsName && !data.brideParentsName) {
      ctx.addIssue({
        code: "custom",
        message: "Bride parents name is required.",
        path: ["brideParentsName"],
      })
    }
  })
