import { ServerCoupon } from '@/types/coupon'
import { faker } from '@faker-js/faker'

export function createServerCoupon(
  overrides: Partial<ServerCoupon> = {}
): ServerCoupon {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    slug: faker.lorem.slug(),
    title: faker.commerce.productName(),
    image: faker.image.url(),
    rules: faker.lorem.paragraph(),
    cashback:
      faker.helpers.maybe(
        () => ({
          type: faker.helpers.arrayElement(['PERCENTAGE', 'OFFER'] as const),
          rate: {
            current: faker.number.int({ min: 1, max: 20 }),
            previous:
              faker.helpers.maybe(() =>
                faker.number.int({ min: 1, max: 15 })
              ) ?? null,
          },
        }),
        { probability: 0.7 }
      ) ?? null,
    badge:
      faker.helpers.maybe(() => `${faker.number.int({ min: 5, max: 50 })}%`) ??
      null,
    discount:
      faker.helpers.maybe(() => faker.number.int({ min: 5, max: 50 })) ?? null,
    ...overrides,
  }
}
