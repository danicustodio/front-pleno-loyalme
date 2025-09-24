import { ServerCoupon, CouponDetailsResponse } from '@/types/coupon'
import { createServerCoupon } from './create-server-coupon'

export function createCouponDetailsResponse(
  coupon?: ServerCoupon,
  overrides: Partial<CouponDetailsResponse> = {}
): CouponDetailsResponse {
  return {
    message: 'success',
    code: '200',
    data: coupon || createServerCoupon(),
    ...overrides,
  }
}
