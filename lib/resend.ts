import { ReactElement } from "react"
import { Resend } from "resend"

import { env } from "@/env.mjs"

import { nanoid } from "./utils"

export const resend = new Resend(env.NEXT_PUBLIC_RESEND_API_KEY)

export const sendEmail = ({
  to,
  subject,
  react,
}: {
  to: string
  subject: string
  react: ReactElement
}) => {
  return resend.emails.send({
    to,
    from: "Kevin from evestory <no-reply@accounts.evestory.day>",
    subject,
    react,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  })
}
