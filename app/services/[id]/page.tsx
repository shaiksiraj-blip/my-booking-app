import { prisma } from '../../lib/prisma'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const service = await prisma.service.findUnique({
    where: { id },
  })

  if (!service) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link href="/services" className="text-indigo-600 hover:underline text-sm mb-6 inline-block">
          ← Back to Services
        </Link>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <span className="text-xs font-medium bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
            {service.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-2">{service.title}</h1>
          <p className="text-gray-500 mb-6">{service.description}</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="text-2xl font-bold text-indigo-600">₹{service.price}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400 mb-1">Duration</p>
              <p className="text-2xl font-bold text-gray-800">{service.duration} mins</p>
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <Link
            href={`/checkout?serviceId=${service.id}&title=${encodeURIComponent(service.title)}&price=${service.price}`}
            className="w-full bg-indigo-600 text-white text-center py-3 rounded-lg hover:bg-indigo-700 transition font-semibold block"
          >
            Proceed to Payment — ₹{service.price}
          </Link>
        </div>
      </main>
    </div>
  )
}