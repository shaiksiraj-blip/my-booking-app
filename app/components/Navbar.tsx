'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-sm border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          BookIt
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
            Services
          </Link>
          {session ? (
            <>
              <Link href="/dashboard/bookings" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition">
                My Bookings
              </Link>
              <span className="text-gray-600 dark:text-gray-300 text-sm">Hi, {session.user?.name?.split(' ')[0]}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Login
            </Link>
          )}
          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-slate-600 transition"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <button className="md:hidden text-gray-600 dark:text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/services" className="text-gray-600 dark:text-gray-300">Services</Link>
          {session ? (
            <>
              <Link href="/dashboard/bookings" className="text-gray-600 dark:text-gray-300">My Bookings</Link>
              <button onClick={() => signOut({ callbackUrl: '/' })} className="text-left text-red-500">Logout</button>
            </>
          ) : (
            <Link href="/login" className="text-indigo-600 font-medium">Login</Link>
          )}
          <button onClick={toggleTheme} className="text-left text-gray-600 dark:text-gray-300">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
      )}
    </nav>
  )
}