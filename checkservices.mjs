import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const services = await prisma.service.findMany()
console.log(JSON.stringify(services, null, 2))
await prisma.$disconnect()