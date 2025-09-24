import { CouponCodeResponse } from '@/types/coupon'
import { faker } from '@faker-js/faker'

export function createCouponCodeResponse(
  overrides: Partial<CouponCodeResponse['data']> = {}
): CouponCodeResponse {
  const id = faker.number.int({ min: 1, max: 1000 })

  return {
    message: 'success',
    code: '200',
    data: {
      id,
      offerId: faker.number.int({ min: 1, max: 1000 }),
      code: faker.string
        .alphanumeric({ length: { min: 6, max: 12 } })
        .toUpperCase(),
      ...overrides,
    },
  }
}
