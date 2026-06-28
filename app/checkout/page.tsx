'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState, Suspense } from 'react'
import Navbar from '../components/Navbar'

declare global {
  interface Window { Razorpay: any }
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState('')

  const serviceId = searchParams.get('serviceId') || ''
  const title = searchParams.get('title') || ''
  const price = searchParams.get('price') || '0'

  async function handlePayment() {
    if (!date) {
      alert('Please select a date and time first')
      return
    }
    setLoading(true)

    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceId, scheduledAt: date }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    document.body.appendChild(script)

    script.onload = () => {
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        order_id: data.orderId,
        name: 'BookIt',
        description: title,
        handler: async (response: any) => {
          const verify = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...response, bookingId: data.bookingId }),
          })
          if (verify.ok) {
            router.push('/dashboard/bookings?success=true')
          }
        },
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#6366f1' },
      })
      rzp.open()
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-lg mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Confirm Booking</h1>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="text-3xl font-bold text-indigo-600 mt-2">₹{price}</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date & Time
            </label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Processing...' : `Pay ₹${price} with Razorpay`}
          </button>
          <p className="text-xs text-gray-400 text-center mt-4">
            Secure payment powered by Razorpay
          </p>
        </div>
      </main>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}