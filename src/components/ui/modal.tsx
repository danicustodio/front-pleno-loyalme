import { MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ModalCloseButton } from './modal-close-button'
import { useBodyScrollLock } from '@/hooks/use-body-scroll-block'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  closeButtonAriaLabel?: string
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  closeButtonAriaLabel,
}: ModalProps) => {
  useBodyScrollLock(isOpen)

  const handleOverlayClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 bg-black/50" onClick={handleOverlayClick}>
      <div
        className="border-loyal-gray-4 fixed right-0 bottom-0 left-0 max-h-[65vh] w-full rounded-t-3xl border bg-white pt-[35px] md:top-1/2 md:right-auto md:bottom-auto md:left-1/2 md:h-auto md:max-h-[80vh] md:w-[500px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl lg:w-[600px]"
        role="dialog"
        aria-modal="true"
      >
        <ModalCloseButton onClose={onClose} ariaLabel={closeButtonAriaLabel} />
        {children}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
