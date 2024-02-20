import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

import { EVESTORY_LOGO_BLUE_URL } from "../lib/constants/logo";
import { Tailwind } from "./components/tailwind";

interface Props {
  magicLink?: string;
}

export const LoginLink = ({
  magicLink = "http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=your.email%40mail.com",
}: Props) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Tailwind>
      <Body className="m-auto bg-white font-sans">
        <Container className="mx-auto my-10 max-w-[500px] border border-solid border-gray-200 bg-solitude px-10 py-5">
          <Img
            src={EVESTORY_LOGO_BLUE_URL}
            width={48}
            height={48}
            alt="evestory Logo"
          />
          <Heading className="my-12 text-2xl font-bold">
            Your magic link for evestory
          </Heading>
          <Text className="text-md mb-4">Welcome to evestory!</Text>
          <Text className="text-md mb-4">
            Please click the button below to log in to your account.
          </Text>
          <Section className="my-8 text-center">
            <Link
              className="rounded-md bg-governor-bay px-6 py-3 text-center text-xs font-semibold text-white no-underline shadow"
              href={magicLink}
            >
              Login to evestory
            </Link>
          </Section>

          <Text className="text-md">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            If you didn't request this, you can safely ignore this email.
          </Text>

          <Hr className="mt-10 border-gray-200" />

          <Img
            src={EVESTORY_LOGO_BLUE_URL}
            width={32}
            height={32}
            className="mb-2 mt-5 grayscale"
            style={{
              filter: "grayscale(100%)",
              WebkitFilter: "grayscale(100%)",
            }}
          />
          <Link
            className="text-xs text-gray-500 underline"
            href="https://evestory.day"
          >
            evestory.day
          </Link>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default LoginLink;
