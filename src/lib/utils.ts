import { type ClassValue, clsx } from "clsx";
import { customAlphabet } from "nanoid/non-secure";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

import { HOME_DOMAIN } from "./constants";
import { NAVS } from "./constants/design-template";
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
    // move to https://nextjs.org/docs/app/api-reference/functions/generate-viewport
    // themeColor: "#FFF",
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

export function titleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function generateNavs(path: string, slug: string) {
  let path_ = path.split("/").filter(Boolean);
  let navs = [...NAVS];
  if (path_.includes("preview")) {
    return navs.map((nav) => ({
      ...nav,
      path: `/event/${slug}/preview${nav.path}`,
    }));
  }

  return navs;
}
