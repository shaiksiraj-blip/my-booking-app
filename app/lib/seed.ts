import { prisma } from './prisma'

async function seed() {
  await prisma.service.createMany({
    data: [
      {
        title: 'Haircut & Styling',
        description: 'Professional haircut and styling by expert stylists. Includes wash and blow dry.',
        price: 499,
        duration: 60,
        category: 'Beauty',
        isActive: true,
      },
      {
        title: 'Deep Tissue Massage',
        description: 'Relaxing full body deep tissue massage. Relieves muscle tension and stress.',
        price: 1200,
        duration: 90,
        category: 'Wellness',
        isActive: true,
      },
      {
        title: 'Yoga Session',
        description: 'One-on-one yoga training session with certified instructor. All levels welcome.',
        price: 800,
        duration: 60,
        category: 'Fitness',
        isActive: true,
      },
      {
        title: 'House Cleaning',
        description: 'Complete home cleaning service. Kitchen, bathrooms, bedrooms and living areas.',
        price: 1500,
        duration: 180,
        category: 'Home',
        isActive: true,
      },
      {
        title: 'AC Service & Repair',
        description: 'Full AC servicing including cleaning, gas refill check and repair if needed.',
        price: 699,
        duration: 120,
        category: 'Home',
        isActive: true,
      },
      {
        title: 'Personal Training',
        description: 'One-on-one gym training session with certified personal trainer.',
        price: 1000,
        duration: 60,
        category: 'Fitness',
        isActive: true,
      },
    ],
  })
  console.log('✅ Services seeded successfully!')
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect())