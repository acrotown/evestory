import "server-only";

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

export let getEvent = async (slug: string) => {
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
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
};

export let getCacheEvent = unstable_cache(
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
      },
    });

    if (!event) {
      return notFound();
    }

    return event;
  },
  ["event"],
  {
    tags: ["event"],
  },
);
