export type ModalSize = 'sm' | 'md' | 'lg'

export interface ModalState {
  id: string
  component: React.ReactNode
  preventClose?: boolean
  zIndex?: number
  triggerElement?: HTMLElement | null
  focusHistory: HTMLElement[]
}

export interface ModalContextValue {
  modalStack: ModalState[]
  pushModal: (modal: Omit<ModalState, 'id' | 'focusHistory'>) => string
  popModal: (id?: string) => void
  closeAllModals: () => void
  updateModal: (id: string, updates: Partial<ModalState>) => void
}
