import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth/next"
import Email from "next-auth/providers/email"
import Google from "next-auth/providers/google"

import { users } from "@/drizzle/schema"
import LoginLink from "@/emails/login-link"
import drizzle from "@/lib/drizzle"
import { sendEmail } from "@/lib/resend"

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

const handler = NextAuth({
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
  // @ts-ignore
  adapter: DrizzleAdapter(drizzle),
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
        const userExists = await drizzle.query.users.findFirst({
          where: eq(users.email, user.email),
        })

        if (userExists && !userExists.name) {
          await drizzle
            .update(users)
            .set({ name: profile?.name, image: profile?.image })
            .where(eq(users.email, user.email))
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
