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
  Tailwind,
  Text,
} from "@react-email/components"
import * as React from "react"

interface Props {
  magicLink?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ""

export const LoginLink = ({ magicLink = "https://evestory.day" }: Props) => (
  <Html>
    <Head />
    <Preview>Log in with this magic link.</Preview>
    <Tailwind>
      <Body className="bg-[#F3F4F7] font-sans">
        <Container style={container}>
          <Img
            src="https://evestory.s3.ap-southeast-3.amazonaws.com/logo-blue.png"
            width={48}
            height={48}
            alt="evestory Logo"
          />
          <Heading style={heading}>🪄 Your magic link</Heading>
          <Section style={body}>
            <Text style={paragraph}>
              {/* <Link style={link} href={magicLink}> */}
              <Link className="text-blue-700" href={magicLink}>
                👉 Click here to sign in 👈
              </Link>
            </Text>
            <Text style={paragraph}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              If you didn't request this, please ignore this email.
            </Text>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />- Kevin
          </Text>
          <Hr style={hr} />
          <Img
            src="https://evestory.s3.ap-southeast-3.amazonaws.com/logo-blue.png"
            width={32}
            height={32}
            style={{
              WebkitFilter: "grayscale(100%)",
              filter: "grayscale(100%)",
              margin: "20px 0",
            }}
          />
          {/* <Text style={footer}>Raycast Technologies Inc.</Text> */}
          {/* <Text style={footer}>
          2093 Philadelphia Pike #3222, Claymont, DE 19703
        </Text> */}
          <Text style={footer}>Acropolis Technologies Limited.</Text>
          <Text style={footer}>Denpasar, Bali, Indonesia 80238</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default LoginLink

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
}

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
}

const body = {
  margin: "24px 0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
}

const link = {
  color: "#FF6363",
}

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
}
