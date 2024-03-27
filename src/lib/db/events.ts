"use server";

import "server-only";

import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import { events } from "#/drizzle/schema";

import { getSession } from "../auth";
import { db } from "../drizzle";

export let getEvents = async () => {
  let { user } = await getSession();
  if (!user) {
    return [];
  }

  let eves = await db.query.events.findMany({
    where({ userId }, { eq }) {
      return eq(userId, user.id);
    },
    with: {
      grooms: {
        columns: {
          name: true,
          photoUrl: true,
        },
      },
      brides: {
        columns: {
          name: true,
          photoUrl: true,
        },
      },
    },
  });

  return eves;
};

export let getEventBySlug = async (slug: string) => {
  let { user } = await getSession();

  let event = await db.query.events.findFirst({
    where({ url }, { eq, and }) {
      return and(eq(url, slug), eq(events.userId, user.id));
    },
    with: {
      grooms: true,
      brides: true,
      subEvents: {
        orderBy({ date }, { asc }) {
          return [asc(date)];
        },
        // https://orm.drizzle.team/docs/rqb#include-custom-fields
        // extras(fields, operators) {}
      },
      guests: true,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
};

export let getCacheEventBySlugForMiddleware = unstable_cache(
  async (slug: string) => {
    let event = await db
      .select({
        design: events.design,
        url: events.url,
        isPublished: events.isPublished,
        paymentStatus: events.paymentStatus,
      })
      .from(events)
      .where(eq(events.url, slug));

    if (!event) {
      return notFound();
    }

    return event;
  },
  ["event-by-slug-for-middleware"],
  {
    tags: ["event-by-slug-for-middleware"],
  },
);

export let getCacheEventBySlug = unstable_cache(
  async (slug: string) => {
    let { user } = await getSession();

    let event = await db.query.events.findFirst({
      where({ url }, { eq, and }) {
        return and(eq(url, slug), eq(events.userId, user.id));
      },
      with: {
        grooms: true,
        brides: true,
        subEvents: {
          orderBy({ date }, { asc }) {
            return [asc(date)];
          },
          // https://orm.drizzle.team/docs/rqb#include-custom-fields
          // extras(fields, operators) {}
        },
        guests: true,
      },
    });

    if (!event) {
      return notFound();
    }

    return event;
  },
  ["get-event-by-slug"],
  {
    tags: ["get-event-by-slug"],
  },
);

export let getCacheEventBySlugForPublic = unstable_cache(
  async (slug: string) => {
    let event = await db.query.events.findFirst({
      where({ url }, { eq }) {
        return eq(url, slug);
      },
      with: {
        grooms: true,
        brides: true,
        subEvents: {
          orderBy({ date }, { asc }) {
            return [asc(date)];
          },
          // https://orm.drizzle.team/docs/rqb#include-custom-fields
          // extras(fields, operators) {}
        },
        guests: true,
      },
    });

    if (!event) {
      return notFound();
    }

    return event;
  },
  ["get-event-by-slug-for-public"],
  {
    tags: ["get-event-by-slug-for-public"],
  },
);
