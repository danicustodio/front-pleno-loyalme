import { Coupon } from '@/types/coupon'
import { CouponImage } from './coupon-image'
import { CouponBadge } from './coupon-badge'
import { CouponModalSkeleton } from './coupon-modal-skeleton'
import { Modal } from '@/components/ui/modal'
import { ModalError } from '@/components/ui/modal-error'
import { useGetCouponDetails } from '@/hooks/use-get-coupon-details'

interface CouponModalProps {
  isOpen: boolean
  onClose: () => void
  coupon: Coupon
}

export const CouponModal = ({ isOpen, onClose, coupon }: CouponModalProps) => {
  const { data: details, isLoading, error } = useGetCouponDetails(coupon.slug)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(details?.code ?? '')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && <CouponModalSkeleton />}

      {error && <ModalError message={error.message} />}

      {!isLoading && !error && details && (
        <div>
          <div className="flex gap-2">
            <CouponImage alt={`Cupom ${details.title}`} src={details.image} />
            <div>
              <div className="mb-[11px] flex gap-2">
                {!!details.discount && <CouponBadge value={details.discount} />}
                {!!details.cashback && <CouponBadge value={details.cashback} />}
              </div>
              <p className="text-loyal-gray-3 text-base leading-5">
                {details.title}
              </p>
            </div>
          </div>

          <div className="mt-8 mb-10 flex h-[50px] w-full">
            <div className="border-loyal-red flex flex-1 items-center justify-center rounded-l-full border-2">
              <p className="text-loyal-gray-3 text-center text-base leading-4 font-bold">
                {details.code}
              </p>
            </div>
            <button
              type="button"
              className="border-loyal-red bg-loyal-red w-[105px] rounded-r-full border-2 text-center text-sm leading-4 font-bold text-white"
              onClick={handleCopyCode}
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
                {details.rules}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  )
}
