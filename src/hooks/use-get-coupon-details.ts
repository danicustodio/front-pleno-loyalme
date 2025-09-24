import {
  CouponCodeResponseSchema,
  CouponDetailsResponseSchema,
  CouponDetails,
} from '@/types/coupon'
import { FIVE_MINUTES, QUERY_KEYS, TEN_MINUTES } from '@/utils/constants'
import { getCashbackType } from '@/utils/get-cashback-type'
import { getDiscountType } from '@/utils/get-discount-type'
import { API_ENDPOINTS } from '@/config/api'
import { useQuery } from '@tanstack/react-query'

export function useGetCouponDetails(slug: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.couponDetails, slug],
    queryFn: async (): Promise<CouponDetails> => {
      try {
        const [detailsResponse, codeResponse] = await Promise.all([
          fetch(API_ENDPOINTS.COUPON_DETAILS(slug)),
          fetch(API_ENDPOINTS.COUPON_CODE(slug)),
        ])

        if (!detailsResponse.ok || !codeResponse.ok) {
          throw new Error(
            `HTTP error! status: ${detailsResponse.status || codeResponse.status}`
          )
        }

        const [detailsData, codeData] = await Promise.all([
          detailsResponse.json(),
          codeResponse.json(),
        ])

        const validDetails = CouponDetailsResponseSchema.parse(detailsData)
        const validCode = CouponCodeResponseSchema.parse(codeData)

        return {
          id: validDetails.data.id,
          slug: validDetails.data.slug,
          title: validDetails.data.title,
          image: validDetails.data.image,
          cashback: getCashbackType(validDetails.data),
          discount: getDiscountType(validDetails.data),
          rules: validDetails.data.rules,
          code: validCode.data.code,
        }
      } catch (error: unknown) {
        console.error(error)
        throw new Error('Erro ao carregar detalhes do cupom')
      }
    },
    enabled: !!slug,
    staleTime: FIVE_MINUTES,
    gcTime: TEN_MINUTES,
  })
}
