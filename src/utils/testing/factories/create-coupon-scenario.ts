import { ServerCoupon } from '@/types/coupon'
import { createServerCoupon } from './create-server-coupon'

export const createCouponScenario = {
  withCashback: (overrides: Partial<ServerCoupon> = {}) =>
    createServerCoupon({
      cashback: {
        type: 'PERCENTAGE',
        rate: {
          current: 5,
          previous: null,
        },
      },
      badge: null,
      discount: null,
      ...overrides,
    }),

  withDiscount: (overrides: Partial<ServerCoupon> = {}) =>
    createServerCoupon({
      badge: '20%',
      discount: 20,
      cashback: null,
      ...overrides,
    }),

  withoutBenefits: (overrides: Partial<ServerCoupon> = {}) =>
    createServerCoupon({
      cashback: null,
      badge: null,
      discount: null,
      ...overrides,
    }),
}
