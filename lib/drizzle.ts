import { createClient } from "@libsql/client"
import { drizzle as Drizzle } from "drizzle-orm/libsql"

import * as schema from "@/drizzle/schema"

const client = createClient({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
})

const drizzle = Drizzle(client, { schema })

export default drizzle
