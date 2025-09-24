interface ModalCloseButtonProps {
  onClose: () => void
  ariaLabel?: string
}

export const ModalCloseButton = ({
  onClose,
  ariaLabel = 'Fechar modal',
}: ModalCloseButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClose}
      className="absolute top-2 right-2 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 focus:bg-gray-100"
      aria-label={ariaLabel}
    >
      <svg width="14" height="14" viewBox="0 0 14 14">
        <path
          d="M14,1.4,12.6,0,7,5.6,1.4,0,0,1.4,5.6,7,0,12.6,1.4,14,7,8.4,12.6,14,14,12.6,8.4,7Z"
          fill="#313131"
        />
      </svg>
    </button>
  )
}
