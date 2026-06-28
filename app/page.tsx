import Link from 'next/link'
import Navbar from './components/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <section className="bg-indigo-600 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Book Services Online</h1>
            <p className="text-xl text-indigo-100 mb-10">
              Find and book the best services near you. Easy booking, secure payments, instant confirmation.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/services" className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition">
                Browse Services
              </Link>
              <Link href="/login" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                Get Started
              </Link>
            </div>
          </div>
        </section>
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: '📅', title: 'Easy Booking', desc: 'Book any service in just a few clicks. Pick your time slot and confirm instantly.' },
                { icon: '💳', title: 'Secure Payments', desc: 'Pay safely with UPI, cards, or net banking powered by Razorpay.' },
                { icon: '✅', title: 'Instant Confirmation', desc: 'Get email confirmation immediately after booking. No waiting.' },
              ].map((feature) => (
                <div key={feature.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400 text-sm">
          © 2026 BookIt. All rights reserved.
        </div>
      </footer>
    </div>
  )
}