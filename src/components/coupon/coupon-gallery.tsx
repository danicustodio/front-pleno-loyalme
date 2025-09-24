'use client'
import { useState } from 'react'
import { CouponCard } from './coupon-card'
import { CouponCardSkeleton } from './coupon-card-skeleton'
import { Coupon } from '@/types/coupon'
import { CouponModal } from './coupon-modal'
import { useGetCoupons } from '@/hooks/use-get-coupons'

export const CouponGallery = () => {
  const { data: coupons = [], isLoading, error } = useGetCoupons()
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

  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Erro ao carregar os cupons'

    return (
      <div className="flex h-full items-center justify-center py-8">
        <p className="text-red-500">{errorMessage}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <CouponCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
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

      {isModalOpen && selectedCoupon !== null && (
        <CouponModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          coupon={selectedCoupon}
        />
      )}
    </div>
  )
}
