import { ServerCoupon } from '@/types/coupon'
import { vi } from 'vitest'
import { createCouponCodeResponse } from './create-coupon-code-response'
import { createCouponDetailsResponse } from './create-coupon-details-response'
import { createCouponListResponse } from './create-coupon-list-response'
import { createMockFetchResponse } from './create-mock-fetch-response'

export const createMockFetchScenario = {
  success: (coupons?: ServerCoupon[]) => {
    const mockData = createCouponListResponse(coupons)
    return vi.fn(() => createMockFetchResponse(mockData))
  },

  error: (status = 500, message = 'Internal Server Error') =>
    vi.fn(() =>
      createMockFetchResponse({ error: message }, { ok: false, status })
    ),

  networkError: () => vi.fn(() => Promise.reject(new Error('Network Error'))),

  couponDetailsSuccess: (coupon?: ServerCoupon, code?: string) => {
    const detailsResponse = createCouponDetailsResponse(coupon)
    const codeResponse = createCouponCodeResponse({ code })

    return vi
      .fn()
      .mockResolvedValueOnce(createMockFetchResponse(detailsResponse))
      .mockResolvedValueOnce(createMockFetchResponse(codeResponse))
  },

  couponDetailsError: (status = 500, message = 'Internal Server Error') =>
    vi
      .fn()
      .mockResolvedValueOnce(
        createMockFetchResponse({ error: message }, { ok: false, status })
      )
      .mockResolvedValueOnce(
        createMockFetchResponse({ error: message }, { ok: false, status })
      ),
}
