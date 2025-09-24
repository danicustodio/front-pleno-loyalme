import { describe, expect, it } from 'vitest'
import { getCashbackType } from './get-cashback-type'
import { createServerCoupon } from '@/utils/testing/factories/create-server-coupon'

describe('getCashbackType', () => {
  it('returns null when cashback is null', () => {
    const coupon = createServerCoupon({ cashback: null })

    const result = getCashbackType(coupon)

    expect(result).toBeNull()
  })

  it('formats cashback correctly', () => {
    const coupon = createServerCoupon({
      cashback: {
        type: 'PERCENTAGE',
        rate: {
          current: 5.5,
          previous: null,
        },
      },
    })

    const result = getCashbackType(coupon)

    expect(result).toBe('5,5% de cashback')
  })

  it('formats cashback with integer value correctly', () => {
    const coupon = createServerCoupon({
      cashback: {
        type: 'PERCENTAGE',
        rate: {
          current: 10,
          previous: null,
        },
      },
    })

    const result = getCashbackType(coupon)

    expect(result).toBe('10% de cashback')
  })
})
