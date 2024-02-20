import { z } from "zod";

export let CoupleInformationSchema = z
  .object({
    eventId: z.string(),
    groomId: z.string(),
    brideId: z.string(),
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
  })
  .superRefine((data, ctx) => {
    if (data.isShowGroomParentsName && !data.groomParentsName) {
      ctx.addIssue({
        code: "custom",
        message: "Groom parents name is required.",
        path: ["groomParentsName"],
      });
    }
    if (data.isShowBrideParentsName && !data.brideParentsName) {
      ctx.addIssue({
        code: "custom",
        message: "Bride parents name is required.",
        path: ["brideParentsName"],
      });
    }
  });
