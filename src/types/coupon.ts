interface Cashback {
  type: string
  rate: {
    current: number
    previous: number
  }
}

export interface Coupon {
  id: string
  title: string
  image: string
  cashback: Cashback | null
  badge: string | null
}
