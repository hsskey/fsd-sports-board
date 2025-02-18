import { Button } from '@mantine/core'
import type { ReactNode } from 'react'
import { useModal } from '../modal/hooks/use-modal'
import { Modal } from '../modal/modal'
import type { ModalSize } from '../modal/types'

interface AlertProps {
  isOpen: boolean
  onClose?: () => void
  message: ReactNode
  title?: string
  confirmLabel?: string
  onConfirm?: () => void
  cancelLabel?: string
  type?: 'alert' | 'confirm'
  size?: ModalSize
  preventClose?: boolean
}

export function Alert({
  isOpen,
  onClose,
  message,
  title,
  confirmLabel = '확인',
  onConfirm,
  cancelLabel = '취소',
  type = 'alert',
  size = 'md',
  preventClose,
}: AlertProps) {
  const { popModal } = useModal()

  const handleConfirm = () => {
    onConfirm?.()
    popModal()
    onClose?.()
  }

  const handleCancel = () => {
    popModal()
    onClose?.()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose ?? popModal}
      title={title}
      closeOnClickOutside={false}
      preventClose={preventClose ?? type === 'confirm'}
      size={size}
      hideHeader={!title}
      className="text-center"
    >
      <div className="mb-10 text-center">
        <div className="space-y-2 text-gray-600 text-lg">{message}</div>
      </div>
      <div className="flex justify-center gap-3">
        {type === 'confirm' && (
          <Button
            variant="outline"
            color="gray"
            onClick={handleCancel}
            size="lg"
            className="min-w-[140px]"
          >
            {cancelLabel}
          </Button>
        )}
        <Button onClick={handleConfirm} size="lg" className="min-w-[140px]">
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  )
}
