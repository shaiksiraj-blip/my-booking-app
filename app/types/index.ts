export type UserRole = 'USER' | 'ADMIN'

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

export interface ServiceType {
  id: string
  title: string
  description: string
  price: number
  duration: number
  category: string
  imageUrl?: string | null
  isActive: boolean
  createdAt: Date
}

export interface BookingType {
  id: string
  userId: string
  serviceId: string
  scheduledAt: Date
  status: BookingStatus
  amount: number
  razorpayOrderId?: string | null
  paymentId?: string | null
  createdAt: Date
  service?: ServiceType
}