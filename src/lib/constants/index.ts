/*
  NOTE: Use home.localhost:3000 for HOME_DOMAIN and localhost:3000 for APP_DOMAIN
  in local development because Google OAuth doesn't allow subdomain localhost (e.g. app.localhost:3000)
  as the callback URL.
*/

export const HOME_HOSTNAMES = new Set(["evestory.day", "home.localhost:3000"]);

export const HOME_DOMAIN = "https://evestory.day";

export const SOUVENIRS_HOSTNAMES = new Set([
  "souvenirs.evestory.day",
  "souvenirs.localhost:3000",
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app");
};

export const APP_HOSTNAMES = new Set([
  "app.evestory.day",
  "preview.evestory.day",
  "localhost:3000",
  "app.localhost:3000",
  "willing-piglet-jointly.ngrok-free.app",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://app.evestory.day"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "https://preview.evestory.day"
    : "http://localhost:3000";

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://evestory.day/api"
    : "http://localhost:3000/api";

export let IS_DESKTOP = "(min-width: 768px)";
