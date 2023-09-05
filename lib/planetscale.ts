import { Config, connect } from "@planetscale/database"

import { env } from "@/env.mjs"

const config: Config = {
  url: env.DATABASE_URL,
}

export const conn = env.DATABASE_URL ? connect(config) : null
