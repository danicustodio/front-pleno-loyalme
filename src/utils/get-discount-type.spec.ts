import { describe, expect, it } from 'vitest'
import { getDiscountType } from './get-discount-type'
import { createServerCoupon } from '@/utils/testing/factories/create-server-coupon'

describe('getDiscountType', () => {
  it('returns null when badge is null', () => {
    const coupon = createServerCoupon({ badge: null, discount: 10 })

    const result = getDiscountType(coupon)

    expect(result).toBeNull()
  })

  it('returns badge when badge exists and discount is 0', () => {
    const coupon = createServerCoupon({ badge: 'BRINDE', discount: 0 })

    const result = getDiscountType(coupon)

    expect(result).toBe('BRINDE')
  })

  it('returns badge with OFF when badge exists and discount is greater than 0', () => {
    const coupon = createServerCoupon({ badge: '25%', discount: 15 })

    const result = getDiscountType(coupon)

    expect(result).toBe('25% OFF')
  })

  it('returns null when badge exists but discount is null', () => {
    const coupon = createServerCoupon({ badge: '30%', discount: null })

    const result = getDiscountType(coupon)

    expect(result).toBeNull()
  })
})
