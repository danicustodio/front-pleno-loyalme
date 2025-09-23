import { ServerCoupon } from '@/types/coupon'

export function getDiscountType(coupon: ServerCoupon): string | null {
  const { badge, discount } = coupon

  if (!badge || badge === null) return null

  if (badge && discount === 0) return badge

  if (badge && discount !== null && discount > 0) return `${badge} OFF`

  return null
}
