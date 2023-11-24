import { connect } from "@planetscale/database"

let pcaleConfig = {
  url: process.env.DATABASE_URL,
}

export let conn = process.env.DATABASE_URL ? connect(pcaleConfig) : null
