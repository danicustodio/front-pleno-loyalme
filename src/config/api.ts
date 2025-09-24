const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.cuponeria.com.br'

const API_PATHS = {
  COUPON_LIST: `/public/v4.2/loyalty/cuponeria/category/trend/offer/list`,
  COUPON_DETAILS: `/public/v4.1/loyalty/cuponeria/offer`,
  COUPON_CODE: `/public/v4.1/loyalty/cuponeria/offer/pick`,
} as const

export const API_ENDPOINTS = {
  COUPON_LIST: `${API_BASE_URL}${API_PATHS.COUPON_LIST}?id=5827`,
  COUPON_DETAILS: (slug: string) =>
    `${API_BASE_URL}${API_PATHS.COUPON_DETAILS}?slug=${slug}`,
  COUPON_CODE: (slug: string) =>
    `${API_BASE_URL}${API_PATHS.COUPON_CODE}?slug=${slug}`,
} as const
