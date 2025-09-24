import { createReactQueryWrapper } from '@/utils/testing/react-query-wrapper'
import { QueryClient } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useGetCouponDetails } from './use-get-coupon-details'
import { createCouponScenario } from '@/utils/testing/factories/create-coupon-scenario'
import { createMockFetchScenario } from '@/utils/testing/factories/create-mock-fetch-scenario'

describe('useGetCouponDetails', () => {
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

  it('fetches and transforms coupon details successfully', async () => {
    const mockCoupon = createCouponScenario.withCashback({
      slug: 'coupon-with-cashback',
      title: 'Coupon with Cashback',
    })

    const fetchMock = createMockFetchScenario.couponDetailsSuccess(
      mockCoupon,
      'DISCOUNT25'
    )
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(
      () => useGetCouponDetails('coupon-with-cashback'),
      {
        wrapper: createReactQueryWrapper(queryClient),
      }
    )

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(
      expect.objectContaining({
        slug: 'coupon-with-cashback',
        title: 'Coupon with Cashback',
        discount: null,
        cashback: '5% de cashback',
        code: 'DISCOUNT25',
      })
    )

    expect(fetchMock).toHaveBeenCalledTimes(2)
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://api.cuponeria.com.br/public/v4.1/loyalty/cuponeria/offer?slug=coupon-with-cashback'
    )
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://api.cuponeria.com.br/public/v4.1/loyalty/cuponeria/offer/pick?slug=coupon-with-cashback'
    )
  })

  it('handles error responses', async () => {
    const fetchMock = createMockFetchScenario.couponDetailsError(
      500,
      'Server Error'
    )
    vi.stubGlobal('fetch', fetchMock)

    const { result } = renderHook(() => useGetCouponDetails('invalid-coupon'), {
      wrapper: createReactQueryWrapper(queryClient),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toEqual(
      new Error('Erro ao carregar detalhes do cupom')
    )
  })
})
