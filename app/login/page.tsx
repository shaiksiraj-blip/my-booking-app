'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function handleGoogleLogin() {
    setLoading(true)
    await signIn('google', { callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">BookIt</h1>
        <p className="text-gray-500 mb-8">Sign in to book services and manage your appointments</p>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
        <p className="text-xs text-gray-400 mt-6">By signing in you agree to our Terms of Service</p>
      </div>
    </div>
  )
}