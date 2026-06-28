import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { prisma } from '../../../lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = await req.json()

  const sign = razorpay_order_id + '|' + razorpay_payment_id
  const expectedSign = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
    .update(sign)
    .digest('hex')

  if (expectedSign !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: 'CONFIRMED', paymentId: razorpay_payment_id },
  })

  return NextResponse.json({ success: true })
}