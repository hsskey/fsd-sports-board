import { nanoid } from 'nanoid'
import { createContext, useCallback, useState } from 'react'
import { useFocusManagement } from './hooks/use-focus-management'
import type { ModalContextValue, ModalState } from './types'

export const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalStack, setModalStack] = useState<ModalState[]>([])
  const { saveFocus, restoreFocus } = useFocusManagement()

  const pushModal = useCallback(
    (modal: Omit<ModalState, 'id' | 'focusHistory'>) => {
      const id = nanoid()
      const triggerElement = document.activeElement as HTMLElement
      saveFocus()

      setModalStack((prev) => [
        ...prev,
        {
          ...modal,
          id,
          focusHistory: [],
          triggerElement,
          zIndex: (prev[prev.length - 1]?.zIndex || 50) + 10,
        },
      ])
      return id
    },
    [saveFocus]
  )

  const popModal = useCallback(
    (id?: string) => {
      setModalStack((prev) => {
        const currentStack = [...prev]
        const modalToClose = id
          ? currentStack.find((modal) => modal.id === id)
          : currentStack[currentStack.length - 1]

        if (modalToClose) {
          requestAnimationFrame(() => {
            if (modalToClose.triggerElement) {
              modalToClose.triggerElement.focus()
              modalToClose.triggerElement.classList.add('focus-visible')
            }
          })
        }

        if (id) {
          const modalIndex = currentStack.findIndex((modal) => modal.id === id)
          if (modalIndex === -1) return prev
          currentStack.splice(modalIndex, 1)
        } else {
          currentStack.pop()
        }

        if (currentStack.length === 0) {
          restoreFocus()
        }

        return currentStack
      })
    },
    [restoreFocus]
  )

  const updateModal = useCallback(
    (id: string, updates: Partial<ModalState>) => {
      setModalStack((prev) =>
        prev.map((modal) =>
          modal.id === id ? { ...modal, ...updates } : modal
        )
      )
    },
    []
  )

  const closeAllModals = useCallback(() => {
    setModalStack((prev) => {
      for (let i = prev.length - 1; i >= 0; i--) {
        const modal = prev[i]
        if (modal.triggerElement) {
          requestAnimationFrame(() => {
            modal.triggerElement?.focus()
            modal.triggerElement?.classList.add('focus-visible')
          })
        }
      }
      return []
    })

    restoreFocus()
  }, [restoreFocus])

  return (
    <ModalContext.Provider
      value={{ modalStack, pushModal, popModal, updateModal, closeAllModals }}
    >
      {children}
      {modalStack.map((modal) => (
        <div key={modal.id}>{modal.component}</div>
      ))}
    </ModalContext.Provider>
  )
}
