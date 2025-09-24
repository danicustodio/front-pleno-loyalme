import { ServerCoupon, CouponListResponse } from '@/types/coupon'
import { createServerCoupon } from './create-server-coupon'

export function createCouponListResponse(
  coupons?: ServerCoupon[],
  overrides: Partial<CouponListResponse> = {}
): CouponListResponse {
  const data = coupons || [createServerCoupon(), createServerCoupon()]

  return {
    message: 'success',
    code: '200',
    data,
    pagination: {
      currentPage: 1,
      lastPage: 1,
      perPage: 10,
      from: 1,
      to: data.length,
      total: data.length,
    },
    ...overrides,
  }
}
