import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const data = [
  { title: 'Haircut', description: 'Professional haircut', price: 499, duration: 60, category: 'Beauty', isActive: true },
  { title: 'Massage', description: 'Full body massage', price: 1200, duration: 90, category: 'Wellness', isActive: true },
  { title: 'Yoga', description: 'Yoga training session', price: 800, duration: 60, category: 'Fitness', isActive: true },
]
await prisma.service.createMany({ data })
console.log('Done!')
await prisma.$disconnect()