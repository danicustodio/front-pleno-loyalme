interface ModalErrorProps {
  message?: string
}

export const ModalError = ({
  message = 'Erro ao carregar informações',
}: ModalErrorProps) => {
  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-red-500">{message}</p>
    </div>
  )
}
