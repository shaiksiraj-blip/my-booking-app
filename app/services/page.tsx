import Link from 'next/link'
import { prisma } from '../lib/prisma'
import Navbar from '../components/Navbar'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Services</h1>
        <p className="text-gray-500 mb-10">Choose from our range of professional services</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
              <div className="mb-3">
                <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
                  {service.category}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h2>
              <p className="text-gray-500 text-sm mb-4 flex-1">{service.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-indigo-600">₹{service.price}</span>
                <span className="text-sm text-gray-400">{service.duration} mins</span>
              </div>
              <Link
                href={`/services/${service.id}`}
                className="w-full bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}