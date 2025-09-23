import { Coupon, CouponListResponseSchema } from '@/types/coupon'
import { FIVE_MINUTES, QUERY_KEYS, TEN_MINUTES } from '@/utils/constants'
import { getCashbackType } from '@/utils/get-cashback-type'
import { getDiscountType } from '@/utils/get-discount-type'
import { useQuery } from '@tanstack/react-query'

export function useGetCoupons() {
  return useQuery({
    queryKey: [QUERY_KEYS.couponList],
    queryFn: async (): Promise<Coupon[]> => {
      try {
        const response = await fetch(
          'https://api.cuponeria.com.br/public/v4.2/loyalty/cuponeria/category/trend/offer/list?id=5827'
        )

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        const validResponse = CouponListResponseSchema.parse(data)

        return validResponse.data.map(serverCoupon => {
          return {
            id: serverCoupon.id,
            slug: serverCoupon.slug,
            title: serverCoupon.title,
            image: serverCoupon.image,
            cashback: getCashbackType(serverCoupon),
            discount: getDiscountType(serverCoupon),
            rules: serverCoupon.rules,
          }
        })
      } catch (error: unknown) {
        console.error(error)
        throw new Error('Erro ao carregar os cupons')
      }
    },
    staleTime: FIVE_MINUTES,
    gcTime: TEN_MINUTES,
  })
}
