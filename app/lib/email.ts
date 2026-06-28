import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingConfirmation({
  to,
  userName,
  serviceName,
  scheduledAt,
  amount,
  paymentId,
}: {
  to: string
  userName: string
  serviceName: string
  scheduledAt: Date
  amount: number
  paymentId: string
}) {
  await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: `Booking confirmed — ${serviceName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmed!</h2>
        <p>Hi ${userName},</p>
        <p>Your booking has been confirmed. Here are the details:</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Service</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date & Time</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${scheduledAt.toLocaleString('en-IN')}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Amount Paid</strong></td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${amount}</td>
          </tr>
          <tr>
            <td style="padding: 8px;"><strong>Payment ID</strong></td>
            <td style="padding: 8px;">${paymentId}</td>
          </tr>
        </table>
        <p>Thank you for your booking!</p>
      </div>
    `,
  })
}