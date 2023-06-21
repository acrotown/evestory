import NextAuth from "next-auth/next"
import Google from "next-auth/providers/google"

import { env } from "@/env.mjs"

const handler = NextAuth({
  providers: [
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
})

export { handler as GET, handler as POST }
