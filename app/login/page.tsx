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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">BookIt</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">Sign in to book services and manage your appointments</p>
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-slate-600 rounded-lg px-6 py-3 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
        <p className="text-xs text-gray-400 mt-6">By signing in you agree to our Terms of Service</p>
      </div>
    </div>
  )
}