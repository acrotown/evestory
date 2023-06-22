const { PrismaClient } = require("@prisma/client")

const { users } = require("./data")

const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.user.deleteMany()
    console.log("Deleted records in user table")

    await prisma.user.createMany({
      data: users,
    })
    console.log("Added user data")
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
