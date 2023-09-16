import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth from "next-auth/next"
import Email from "next-auth/providers/email"
import Google from "next-auth/providers/google"

import LoginLink from "@/emails/login-link"
import { env } from "@/env.mjs"
import prisma from "@/lib/prisma"
import { sendEmail } from "@/lib/resend"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

const handler = NextAuth({
  providers: [
    Email({
      sendVerificationRequest({ identifier, url }) {
        if (env.NODE_ENV === "development") {
          console.info("Skipping email in development mode")
          console.info(`Email verification link: ${url}`)
        } else {
          sendEmail({
            to: identifier,
            subject: "Your magic link to evestory 🎉",
            react: LoginLink({ magicLink: url }),
          })
        }
      },
    }),
    Google({
      clientId: env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  /** https://github.com/nextauthjs/next-auth/issues/7727 */
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? ".evestory.day" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user?.email) {
        return false
      }
      if (account?.provider === "google") {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        })

        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              image: profile?.image,
            },
          })
        }
      }

      return true
    },
    jwt({ token, user }) {
      if (!token.email) {
        return {}
      }

      if (user) {
        token.user = user
      }

      // TODO: refresh user data if they update their name/email

      return token
    },
    session({ session, token }) {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      }

      return session
    },
  },
  events: {
    signIn() {
      // TODO: send welcome email
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
})

export { handler as GET, handler as POST }
