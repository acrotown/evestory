import { env } from "@/env.mjs"

/*
  NOTE: Use home.localhost:3000 for HOME_DOMAIN and localhost:3000 for APP_DOMAIN
  in local development because Google OAuth doesn't allow subdomain localhost (e.g. app.localhost:3000)
  as the callback URL. 
*/

export const HOME_HOSTNAMES = new Set(["evestory.day", "home.localhost:3000"])

export const SOUVENIRS_HOSTNAMES = new Set([
  `souvenirs.${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
  "souvenirs.localhost:3000",
])

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app")
}

export const APP_HOSTNAMES = new Set([
  "app.evestory.day",
  "preview.evestory.day",
  "localhost:3000",
  "app.localhost:3000",
])

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.evestory.day"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "https://preview.evestory.day"
    : "http://localhost:3000"

export const ROOT_HOSTNAMES = new Set([
  env.NEXT_PUBLIC_ROOT_DOMAIN,
  "localhost:3000",
])

export const EVESTORY_LOGO_URL =
  "https://evestory.s3.ap-southeast-3.amazonaws.com/evestory.svg"
