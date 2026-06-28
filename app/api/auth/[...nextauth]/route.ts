import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from '../../../lib/prisma'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: { signIn: '/login' },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false
      await prisma.user.upsert({
        where: { email: user.email },
        update: { name: user.name },
        create: { email: user.email, name: user.name },
      })
      return true
    },
  },
})

export { handler as GET, handler as POST }
