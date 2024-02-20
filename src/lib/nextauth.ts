import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";

import LoginLink from "@/emails/login-link";
import WelcomeEmail from "@/emails/welcome-email";
import { logsnag } from "@/lib/logsnag";
import { sendEmail } from "@/lib/resend";
import { users } from "#/drizzle/schema";

import { db } from "./drizzle";

let VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export let authOptions = {
  providers: [
    Email({
      sendVerificationRequest({ identifier, url }) {
        if (process.env.VERCEL_ENV === "development") {
          console.info("Skipping email in development mode");
          console.info(`Email verification link: ${url}`);
          return;
        }

        sendEmail({
          to: identifier,
          subject: "Your magic link to evestory 🎉",
          react: LoginLink({ magicLink: url }),
        });
      },
    }),
    Google({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: DrizzleAdapter(db) as Adapter,
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
        return false;
      }
      if (account?.provider === "google") {
        let [userExists] = await db
          .select({ name: users.name })
          .from(users)
          .where(eq(users.email, user.email));

        if (userExists && !userExists.name) {
          await db
            .update(users)
            // @ts-expect-error - profile.picture is exist but on in the type
            .set({ name: profile?.name, image: profile?.picture })
            .where(eq(users.email, user.email));
        }
      }

      return true;
    },
    jwt({ token, user }) {
      if (!token.email) {
        return {};
      }

      if (user) {
        token.user = user;
      }

      // TODO: refresh user data if they update their name/email

      return token;
    },
    session({ session, token }) {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      };

      return session;
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser && user.email) {
        if (process.env.NODE_ENV === "production") {
          sendEmail({
            to: user.email,
            subject: "Welcome to evestory - Where Your Dream Wedding Begins!",
            react: WelcomeEmail(),
          });

          await logsnag.track({
            notify: true,
            event: "Sign up",
            channel: "sign-ups",
            icon: "👋",
            description: `User ${user.email} signed up`,
          });
        }
      } else {
        // if (process.env.NODE_ENV === "production") {
        //   await logsnag.track({
        //     notify: true,
        //     event: "Sign in",
        //     channel: "sign-in",
        //     icon: "👋",
        //     description: `User ${user.email} signed in`,
        //   });
        // }
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
} satisfies NextAuthOptions;
