import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { razorpay } from '../../../lib/razorpay'
import { prisma } from '../../../lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Please login first' }, { status: 401 })
  }

  const { serviceId, scheduledAt } = await req.json()

  const user = await prisma.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const service = await prisma.service.findUnique({ where: { id: serviceId } })
  if (!service) return NextResponse.json({ error: 'Service not found' }, { status: 404 })

  const amountInPaise = Math.round(service.price * 100)

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: 'INR',
    receipt: `booking_${Date.now()}`,
  })

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      serviceId,
      scheduledAt: new Date(scheduledAt),
      amount: service.price,
      razorpayOrderId: order.id,
      status: 'PENDING',
    },
  })

  return NextResponse.json({ orderId: order.id, bookingId: booking.id, amount: amountInPaise })
}