import { Paper } from '@mantine/core'
import clsx from 'clsx'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from './hooks/use-modal'
import type { ModalSize } from './types'
import { scrollLock } from './utils/scroll-lock'

interface ModalProps {
  isOpen: boolean
  onClose: (id?: string) => void
  title?: string
  children: React.ReactNode
  size?: ModalSize
  closeOnClickOutside?: boolean
  returnFocusOnClose?: boolean
  hideHeader?: boolean
  initialFocus?: boolean
  className?: string
  preventClose?: boolean
  modalId?: string
}

export function Modal({
  isOpen,
  onClose,
  modalId,
  title,
  children,
  size = 'md',
  closeOnClickOutside = true,
  preventClose = false,
  initialFocus = false,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const { modalStack } = useModal()
  const zIndex = modalStack.length * 10 + 50

  const handleClose = useCallback(() => {
    if (preventClose) return
    if (modalId) {
      onClose(modalId)
    } else {
      onClose()
    }
  }, [onClose, preventClose, modalId])

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
      scrollLock.lock()

      if (!initialFocus) {
        dialogRef.current?.focus()
      }
    } else {
      scrollLock.unlock()
      dialogRef.current?.close()
    }

    return () => {
      if (isOpen) {
        scrollLock.unlock()
      }
    }
  }, [isOpen, initialFocus])

  const sizeClasses = {
    sm: 'max-w-2xl px-4 py-6',
    md: 'max-w-4xl px-8 py-10',
    lg: 'max-w-6xl px-10 py-12',
  }
  return createPortal(
    <dialog
      ref={dialogRef}
      className={clsx(
        'backdrop:bg-black/50',
        'bg-transparent p-0',
        'open:flex open:items-center open:justify-center'
      )}
      onClose={handleClose}
      onClick={(e) => {
        if (
          closeOnClickOutside &&
          !preventClose &&
          e.target === dialogRef.current
        ) {
          handleClose()
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && !preventClose) {
          console.log('Modal ESC pressed:', {
            title,
            preventClose,
            stackLength: modalStack.length,
          })
          e.stopPropagation()
          handleClose()
        }
      }}
      style={{ zIndex }}
    >
      <Paper
        className={clsx(
          'relative w-full rounded-lg bg-white shadow-xl',
          sizeClasses[size],
          className
        )}
      >
        {title && (
          <div className="mb-6 flex items-center justify-center">
            <h2 className="font-bold text-xl">{title}</h2>
            {!preventClose && (
              <button type="button" onClick={handleClose} className="ml-auto">
                Close
              </button>
            )}
          </div>
        )}
        {children}
      </Paper>
    </dialog>,
    document.body
  )
}
