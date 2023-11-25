import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import Email from "next-auth/providers/email"
import Google from "next-auth/providers/google"

import LoginLink from "@/emails/login-link"
import WelcomeEmail from "@/emails/welcome-email"
import { db } from "@/lib//prisma"
import { logsnag } from "@/lib/logsnag"
import { sendEmail } from "@/lib/resend"

let VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export let authOptions = {
  providers: [
    Email({
      sendVerificationRequest({ identifier, url }) {
        if (process.env.VERCEL_ENV === "development") {
          console.log("Skipping email in development mode")
          console.log(`Email verification link: ${url}`)
          return
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
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
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
        let userExists = await db.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        })

        if (userExists && !userExists.name) {
          await db.user.update({
            where: { email: user.email },
            data: { name: profile?.name, image: profile?.image },
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
    async signIn({ user, isNewUser }) {
      if (isNewUser && user.email) {
        sendEmail({
          to: user.email,
          subject: "Welcome to evestory - Where Your Dream Wedding Begins!",
          react: WelcomeEmail(),
        })

        await logsnag.track({
          notify: true,
          event: "Sign up",
          channel: "sign-ups",
          icon: "👋",
          description: `User ${user.email} signed up`,
        })
      } else {
        await logsnag.track({
          notify: true,
          event: "Sign in",
          channel: "sign-in",
          icon: "👋",
          description: `User ${user.email} signed in`,
        })
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthOptions
