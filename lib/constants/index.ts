import { match } from "ts-pattern"

/*
  NOTE: Use home.localhost:3000 for HOME_DOMAIN and localhost:3000 for APP_DOMAIN
  in local development because Google OAuth doesn't allow subdomain localhost (e.g. app.localhost:3000)
  as the callback URL. 
*/

export const HOME_HOSTNAMES = new Set(["evestory.day", "home.localhost:3000"])

export const SOUVENIRS_HOSTNAMES = new Set([
  "souvenirs.evestory.day",
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

export const APP_DOMAIN = match(process.env.NEXT_PUBLIC_VERCEL_ENV)
  .with("production", () => "https://app.evestory.day")
  .with("preview", () => "https://preview.evestory.day")
  .otherwise(() => "http://localhost:3000")
