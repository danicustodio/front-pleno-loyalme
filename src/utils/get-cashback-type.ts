import { ServerCoupon } from '@/types/coupon'

export function getCashbackType(coupon: ServerCoupon): string | null {
  const { cashback } = coupon

  if (!cashback || cashback === null) return null

  if (cashback.type === 'PERCENTAGE') {
    return `${cashback.rate.current}% de cashback`.replace('.', ',')
  }

  return `${cashback.rate.current} de cashback`.replace('.', ',')
}
