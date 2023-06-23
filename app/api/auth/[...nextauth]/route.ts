import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth/next"
import Google from "next-auth/providers/google"

import { env } from "@/env.mjs"
import prisma from "@/lib/prisma"

const handler = NextAuth({
  providers: [
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  /** https://github.com/nextauthjs/next-auth/issues/7727 */
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    jwt({ token, user }) {
      if (!token.email) {
        return {}
      }

      if (user) {
        token.user = user
      }

      return token
    },
    session({ session, token }) {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...token.user,
      }

      return session
    },
  },
  events: {
    signIn(_params) {
      // TODO: send email
    },
  },
  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
