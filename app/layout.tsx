import type { Metadata } from 'next'
import './globals.css'
import { SessionProvider } from './components/SessionProvider'

export const metadata: Metadata = {
  title: 'BookIt',
  description: 'Book services online easily',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}