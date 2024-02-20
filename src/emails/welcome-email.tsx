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

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>Welcome to evestory</Preview>
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
            Welcome to evestory
          </Heading>
          <Text className="text-md mb-8">
            Thanks for signing up to evestory! We&apos;re thrilled to be a part
            of your journey to create unforgettable wedding invitations that
            capture your unique love story.
          </Text>
          <Text className="mb-4">Explore evestory&apos;s magic:</Text>
          <Text>
            ◆ <strong>Tailored Customization:</strong> Create invitations that
            mirror your love story with personalized designs.
          </Text>
          <Text>
            ◆ <strong>Effortless RSVPs:</strong> Simplify guest management using
            our interactive RSVP feature.
          </Text>
          <Text className="mb-8">
            ◆ <strong>Seamless Planning:</strong> From invites to RSVPs,
            we&apos;ve streamlined the process for a stress-free experience.
          </Text>

          <Text className="mb-8">
            Ready to craft? Log in{" "}
            <Link href="https://app.evestory.day">here</Link> and start creating
            the wedding invitations of your dreams. If you have any questions,
            our dedicated support team is here to assist you.
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

export default WelcomeEmail;
