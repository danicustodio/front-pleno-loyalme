import { Coupon } from '@/types/coupon'
import Image from 'next/image'
import { CouponBadge } from './coupon-badge'

interface CouponCardProps {
  coupon: Coupon
  onClick: (coupon: Coupon) => void
}

export const CouponCard = ({ coupon, onClick }: CouponCardProps) => {
  return (
    <div
      onClick={() => onClick(coupon)}
      className="h-(--loyal-card-height) w-(--loyal-card-width) cursor-pointer overflow-hidden rounded-2xl bg-white p-6 shadow-(--loyal-shadow-card)"
    >
      <div className="flex items-center gap-2">
        <Image
          alt={`Cupom ${coupon.title}`}
          src={coupon.image}
          width={80}
          height={80}
          className="border-loyal-gray-2 h-20 w-20 rounded-full border-[0.5px] object-cover shadow-(--loyal-shadow-image)"
        />
        <div className="flex flex-col gap-1">
          {!!coupon.badge && <CouponBadge value={`${coupon.badge} OFF`} />}
          {!!coupon.cashback && (
            <CouponBadge
              value={`${coupon.cashback?.rate.current}% de cashback`}
            />
          )}
        </div>
      </div>

      <hr className="my-4 border-2 border-dashed border-gray-300" />

      <div>
        <p className="text-loyal-gray-3 text-base leading-5">{coupon.title}</p>
      </div>
    </div>
  )
}
