import { createReactQueryWrapper } from '@/utils/testing/react-query-wrapper'
import { QueryClient } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useGetCoupons } from './use-get-coupons'
import { createCouponScenario } from '@/utils/testing/factories/create-coupon-scenario'
import { createMockFetchScenario } from '@/utils/testing/factories/create-mock-fetch-scenario'
import { API_ENDPOINTS } from '@/config/api'

describe('useGetCoupons', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    vi.clearAllMocks()

    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and transforms coupon data successfully', async () => {
    const mockCoupons = [
      createCouponScenario.withCashback({
        id: 1,
        slug: 'coupon-with-cashback',
        title: 'Coupon with Cashback',
      }),
      createCouponScenario.withoutBenefits({
        id: 2,
        slug: 'basic-coupon',
        title: 'Basic Coupon',
      }),
    ]

    const fetchMock = createMockFetchScenario.success(mockCoupons)
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGetCoupons(), {
      wrapper: createReactQueryWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual([
      expect.objectContaining({
        id: 1,
        slug: 'coupon-with-cashback',
        title: 'Coupon with Cashback',
        discount: null,
        cashback: '5% de cashback',
      }),
      expect.objectContaining({
        id: 2,
        slug: 'basic-coupon',
        title: 'Basic Coupon',
        discount: null,
        cashback: null,
      }),
    ])

    expect(fetchMock).toHaveBeenCalledWith(API_ENDPOINTS.COUPON_LIST)
  })

  it('handles error responses', async () => {
    const fetchMock = createMockFetchScenario.error(500, 'Server Error')
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGetCoupons(), {
      wrapper: createReactQueryWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(
      new Error('Erro ao carregar os cupons')
    )
  })
})
