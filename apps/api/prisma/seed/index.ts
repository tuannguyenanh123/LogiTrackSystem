import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const deleteAll = async () => {
  await prisma.transaction.deleteMany()
  await prisma.distributor.deleteMany()
  await prisma.location.deleteMany()
  await prisma.product.deleteMany()
  await prisma.warehouse.deleteMany()
}

const reset = async () => {
  await deleteAll()
}

const main = async () => {
  await reset()
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
