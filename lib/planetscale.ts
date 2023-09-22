import { Config, connect } from "@planetscale/database"

const config: Config = {
  url: process.env.DATABASE_URL,
}

export const conn = process.env.DATABASE_URL ? connect(config) : null
