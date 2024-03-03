import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid/non-secure";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import { HOME_DOMAIN } from "./constants";
import { SVGS } from "./constants/svgs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "evestory",
  description = "Sharing invitations never this easy.",
  image = "https://evestory.day/_static/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@evestory__",
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export let nanoid = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  9,
);

interface SWRError extends Error {
  status: number;
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  let res = await fetch(input, init);
  if (!res.ok) {
    let error = await res.text();
    let err = new Error(error) as SWRError;
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export function generateRandomImage(images = SVGS) {
  return images[Math.floor(Math.random() * images.length)];
}

export function wsrv(url: string) {
  // `https://wsrv.nl/?url=https://utfs.io/f/527dbbda-9b92-48b5-b702-a5823f14ae1d-2gr9.svg`
  return `https://wsrv.nl/?url=${url}`;
}
