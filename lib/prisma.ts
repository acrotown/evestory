import { PrismaClient } from "@prisma/client"

import { env } from "@/env.mjs"

declare global {
  var prisma: PrismaClient | undefined
}

// if (typeof window === "undefined") {
//   // @ts-ignore
//   global.prisma = global
// }

const prisma = global.prisma || new PrismaClient()

if (env.NODE_ENV === "development") global.prisma = prisma

export default prisma
