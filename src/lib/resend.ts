import { renderAsync } from "@react-email/components";
import { ReactElement } from "react";
import { Resend } from "resend";

import { nanoid } from "@/lib/utils";

export let resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export let sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}) => {
  let html = await renderAsync(react);
  return resend.emails.send({
    to,
    from: "Kevin from evestory <no-reply@accounts.evestory.day>",
    subject,
    // react,
    html,
    headers: {
      "X-Entity-Ref-ID": nanoid(),
    },
  });
};
