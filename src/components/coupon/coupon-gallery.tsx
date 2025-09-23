'use client'
import { useState } from 'react'
import MOCK_COUPONS from '../../../list.json'
import { CouponCard } from './coupon-card'
import { Coupon } from '@/types/coupon'
import { CouponModal } from './coupon-modal'

export const CouponGallery = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(
    MOCK_COUPONS.data as unknown as Coupon[]
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

  const handleCouponClick = (coupon: Coupon) => {
    setSelectedCoupon(coupon)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedCoupon(null)
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

      <CouponModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        coupon={selectedCoupon}
      />
    </div>
  )
}
