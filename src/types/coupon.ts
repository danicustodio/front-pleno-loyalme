import z from 'zod'

export const CashbackSchema = z.object({
  type: z.enum(['PERCENTAGE', 'OFFER']),
  rate: z.object({
    current: z.number(),
    previous: z.number().nullable(),
  }),
})

const BaseCouponSchema = z.object({
  id: z.coerce.number(),
  slug: z.string(),
  title: z.string(),
  image: z.url('Invalid image URL'),
  rules: z.string(),
})
export const ServerCouponSchema = BaseCouponSchema.extend({
  cashback: CashbackSchema.nullable(),
  badge: z.string().nullable(),
  discount: z.coerce.number().nullable(),
})
export const CouponSchema = BaseCouponSchema.extend({
  cashback: z.string().nullable(),
  discount: z.string().nullable(),
})
export type ServerCoupon = z.infer<typeof ServerCouponSchema>
export type Coupon = z.infer<typeof CouponSchema>

export const CouponListResponseSchema = z.object({
  message: z.string(),
  code: z.string(),
  data: z.array(ServerCouponSchema),
  pagination: z
    .object({
      currentPage: z.number(),
      lastPage: z.number(),
      perPage: z.number(),
      from: z.number(),
      to: z.number(),
      total: z.number(),
    })
    .optional(),
})
export type CouponListResponse = z.infer<typeof CouponListResponseSchema>
