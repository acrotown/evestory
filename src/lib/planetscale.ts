import { connect } from "@planetscale/database"

const pcaleConfig = {
  url: process.env.DATABASE_URL,
}

export const conn = process.env.DATABASE_URL ? connect(pcaleConfig) : null
