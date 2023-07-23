import { type ClassValue, clsx } from "clsx"
import { SendVerificationRequestParams } from "next-auth/providers"
import { twMerge } from "tailwind-merge"

import RaycastMagicLinkEmail from "@/emails/raycast"
import { env } from "@/env.mjs"
import { resend } from "@/lib/resend"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function sendVerificationRequest({
  identifier,
  url,
}: SendVerificationRequestParams) {
  try {
    if (env.NODE_ENV === "development") {
      console.info("Skipping email in development mode")
      console.info(`Email verification link: ${url}`)
    } else {
      await resend.sendEmail({
        // from: `Evestory <${env.EMAIL_FROM}>`,
        to: [identifier],
        // subject: "Verify your email address",
        // from: "Acme <onboarding@resend.dev>",
        // from: "evestory <kevin.anantha@gmail.com>",
        from: "Kevin from evestory <no-reply@accounts.evestory.day>",
        // to: ["kuliah.wisma@gmail.com"],
        subject: "Your magic link to evestory.day 🎉",
        react: RaycastMagicLinkEmail({ magicLink: url }),
      })
    }
  } catch (err) {
    console.error("err", err)
  }
}
