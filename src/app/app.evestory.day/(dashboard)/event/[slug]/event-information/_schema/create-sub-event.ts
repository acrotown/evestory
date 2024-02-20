import { z } from "zod";

import { SubEventsSchema } from "@/schemas/sub-events";

export let CreateOrUpdateSubEventSchema = SubEventsSchema.extend({
  id: z.string().optional(),
  eventId: z.string().optional(),
})
  .omit({
    createdAt: true,
  })
  .superRefine((data, ctx) => {
    if (data.startTime && data.endTime) {
      if (data.startTime > data.endTime) {
        ctx.addIssue({
          code: "custom",
          message: "Start time must be before end time.",
          path: ["startTime"],
        });
      }
    }
  });
