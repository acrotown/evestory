import { ReactElement } from "react"
import { Resend } from "resend"

import { nanoid } from "./utils"

export let resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY)

export let sendEmail = ({
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
