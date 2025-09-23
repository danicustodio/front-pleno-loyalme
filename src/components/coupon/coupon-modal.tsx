import { Coupon } from '@/types/coupon'
import { MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { CouponImage } from './coupon-image'
import { CouponBadge } from './coupon-badge'

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  coupon: Coupon | null
}

export const CouponModal = ({ isOpen, onClose, coupon }: CouponModalProps) => {
  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen || coupon === null) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/50" onClick={handleOverlayClick}>
      <div
        className="border-loyal-gray-4 fixed right-0 bottom-0 left-0 h-[65vh] w-full rounded-t-3xl border bg-white px-[15px] pt-[35px] pb-5 md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:h-auto md:max-h-[80vh] md:w-[500px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl lg:w-[600px]"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 focus:bg-gray-100"
          aria-label="Fechar modal"
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path
              d="M14,1.4,12.6,0,7,5.6,1.4,0,0,1.4,5.6,7,0,12.6,1.4,14,7,8.4,12.6,14,14,12.6,8.4,7Z"
              fill="#313131"
            />
          </svg>
        </button>
        <div>
          <div className="flex gap-2">
            <CouponImage alt={`Cupom ${coupon.title}`} src={coupon.image} />
            <div>
              <div className="mb-[11px] flex gap-2">
                {!!coupon.discount && <CouponBadge value={coupon.discount} />}
                {!!coupon.cashback && <CouponBadge value={coupon.cashback} />}
              </div>
              <p className="text-loyal-gray-3 text-base leading-5">
                {coupon.title}
              </p>
            </div>
          </div>

          <div className="mt-8 mb-10 flex h-[50px] w-full">
            <div className="border-loyal-red flex flex-1 items-center justify-center rounded-l-full border-2">
              <p className="text-loyal-gray-3 text-center text-base leading-4 font-bold">
                {' '}
                123456789123456789{' '}
              </p>
            </div>
            <button
              type="button"
              className="border-loyal-red bg-loyal-red w-[105px] rounded-r-full border-2 text-center text-sm leading-4 font-bold text-white"
            >
              copiar e ir para a loja
            </button>
          </div>

          <div className="bg-loyal-gray-5 h-[170px]">
            <p className="text-loyal-gray-3 mb-[11px] text-sm leading-4 font-bold">
              Regras de uso
            </p>
            <div className="h-full overflow-y-auto">
              <p className="text-loyal-gray-3 text-sm leading-[18px]">
                {coupon.rules}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
