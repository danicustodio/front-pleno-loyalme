'use client'
import { useState } from 'react'
import MOCK_COUPONS from '../../../list.json'
import { CouponCard } from './coupon-card'
import { Coupon } from '@/types/coupon'

export const CouponGallery = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(
    MOCK_COUPONS.data as unknown as Coupon[]
  )

  const handleCouponClick = (coupon: Coupon) => {
    console.log('Coupon: ', coupon.title)
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center">
        {coupons.map(coupon => (
          <CouponCard
            key={coupon.id}
            coupon={coupon}
            onClick={() => handleCouponClick(coupon)}
          />
        ))}
      </div>
    </div>
  )
}
