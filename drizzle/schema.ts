import type { AdapterAccount } from "@auth/core/adapters";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export let guests = sqliteTable(
  "guests",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    guestType: text("guestType", { enum: ["family", "friend"] }).default(
      "friend",
    ),
    eventId: text("eventId")
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
  },
  (guests) => ({
    guestIdIdx: index("guestIdIdx").on(guests.id),
    guestEventIdIdx: index("guestEventIdIdx").on(guests.eventId),
  }),
);

export let guestsRelations = relations(guests, ({ one }) => ({
  event: one(events, {
    fields: [guests.eventId],
    references: [events.id],
  }),
}));

export let events = sqliteTable(
  "events",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
    name: text("name").notNull(),
    description: text("description"),
    url: text("url").notNull().unique(),
    date: text("date").notNull(),
    isPublished: integer("isPublished", { mode: "boolean" }).default(false),
    isShowGroomNameFirst: integer("isShowGroomNameFirst", {
      mode: "boolean",
    }).default(true),
    userId: text("userId")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    coverImageUrl: text("coverImageUrl"),
    paymentStatus: text("paymentStatus", { enum: ["unpaid", "paid"] }).default(
      "unpaid",
    ),
    design: text("design", {
      enum: [
        /**
         * Standard white
         */
        "white",
        /**
         * Premium white
         */
        "alabaster",
        "ivory",

        /**
         * Standard black
         */
        "black",
        /**
         * Premium black
         */
        "onyx",

        /**
         * Standard pink
         */
        "pink",
        /**
         * Premium pink
         */
        "rosewood",

        /**
         * Standard red
         */
        "red",
        /**
         * Premium red
         */
        "scarlet",

        /**
         * Standard yellow
         */
        "yellow",
        /**
         * Premium yellow
         */
        "dandelion",

        /**
         * Standard green
         */
        "green",
        /**
         * Premium green
         */
        "moss",

        /**
         * Standard blue
         */
        "blue",
        /**
         * Premium blue
         */
        "arctic",

        /**
         * Standard purple
         */
        "purple",
        /**
         * Premium purple
         */
        "iris",

        /**
         * Standard brown
         */
        "brown",
        /**
         * Premium brown
         */
        "brunette",
      ],
    })
      .default("white")
      .notNull(),
  },
  (events) => ({
    eventIdIdx: index("eventIdIdx").on(events.id),
    eventUserIdIdx: index("eventUserIdIdx").on(events.userId),
    eventUrlIdx: index("eventUrlIdx").on(events.url),
    eventDateIdx: index("eventDateIdx").on(events.date),
  }),
);

export let eventsRelations = relations(events, ({ many, one }) => ({
  brides: one(brides),
  grooms: one(grooms),
  subEvents: many(subEvents),
  guests: many(guests),
}));

export let subEvents = sqliteTable(
  "subEvents",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
    name: text("name").notNull(),
    description: text("description"),
    date: text("date").notNull(),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    location: text("location"),
    address: text("address"),
    eventId: text("eventId")
      .notNull()
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
  },
  (subEvents) => ({
    subEventIdIdx: index("subEventIdIdx").on(subEvents.id),
    subEventEventIdIdx: index("subEventEventIdIdx").on(subEvents.eventId),
    subEventDateIdx: index("subEventDateIdx").on(subEvents.date),
  }),
);

export let subEventsRelations = relations(subEvents, ({ one }) => ({
  event: one(events, {
    fields: [subEvents.eventId],
    references: [events.id],
  }),
}));

export let grooms = sqliteTable(
  "grooms",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    instagramUsername: text("instagram"),
    photoUrl: text("photo"),
    parentsName: text("parentsName"),
    isShowParentsName: integer("isShowParentsName", {
      mode: "boolean",
    }).default(false),
    eventId: text("eventId")
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
  },
  (grooms) => ({
    groomIdIdx: index("groomIdIdx").on(grooms.id),
    groomEventIdIdx: index("groomEventIdIdx").on(grooms.eventId),
  }),
);

export let groomsRelations = relations(grooms, ({ one }) => ({
  event: one(events, {
    fields: [grooms.eventId],
    references: [events.id],
  }),
}));

export let brides = sqliteTable(
  "brides",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name").notNull(),
    instagramUsername: text("instagram"),
    photoUrl: text("photo"),
    parentsName: text("parentsName"),
    isShowParentsName: integer("isShowParentsName", {
      mode: "boolean",
    }).default(false),
    eventId: text("eventId")
      .references(() => events.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
  },
  (brides) => ({
    brideIdIdx: index("brideIdIdx").on(brides.id),
    brideEventIdIdx: index("brideEventIdIdx").on(brides.eventId),
  }),
);

export let bridesRelations = relations(brides, ({ one }) => ({
  event: one(events, {
    fields: [brides.eventId],
    references: [events.id],
  }),
}));

export let users = sqliteTable(
  "user",
  {
    id: text("id")
      .notNull()
      .primaryKey()
      .$defaultFn(() => createId()),
    name: text("name"),
    email: text("email").notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
    image: text("image"),
  },
  (users) => ({
    userIdIdx: index("userIdIdx").on(users.id),
  }),
);

export let accounts = sqliteTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export let sessions = sqliteTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export let verificationTokens = sqliteTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
