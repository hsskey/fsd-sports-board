import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { useCallback, useEffect, useRef } from 'react'
import { type Location, useBlocker } from 'react-router-dom'

interface UsePreventExitProps {
  isDirty: boolean
  alertTitle?: string
  alertMessage?: React.ReactNode
  confirmLabel?: string
  cancelLabel?: string
}

interface UsePreventExitReturn {
  isBlocked: boolean
  proceed: () => void
  reset: () => void
}

export function usePreventExit({
  isDirty,
  alertTitle = '작성 중인 내용이 있습니다.',
  alertMessage = (
    <div className="space-y-2">
      <p>이 페이지를 벗어나면</p>
      <p>작성 중인 내용이 사라집니다.</p>
      <p>이동하시겠습니까?</p>
    </div>
  ),
  confirmLabel = '이동하기',
  cancelLabel = '취소',
}: UsePreventExitProps): UsePreventExitReturn {
  const { pushModal, closeAllModals } = useModal()
  const modalIdRef = useRef<string | null>(null)

  const cleanupModal = useCallback(() => {
    if (modalIdRef.current) {
      closeAllModals()
      modalIdRef.current = null
    }
  }, [closeAllModals])

  // 브라우저 닫기/새로고침 방지
  useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // 라우터 이동 방지
  const blocker = useBlocker(
    useCallback(
      ({
        currentLocation,
        nextLocation,
      }: {
        currentLocation: Location
        nextLocation: Location
      }) => isDirty && currentLocation.pathname !== nextLocation.pathname,
      [isDirty]
    )
  )

  useEffect(() => {
    if (blocker.state === 'blocked' && !modalIdRef.current) {
      modalIdRef.current = pushModal({
        component: (
          <Alert
            isOpen={true}
            title={alertTitle}
            message={alertMessage}
            confirmLabel={confirmLabel}
            cancelLabel={cancelLabel}
            type="confirm"
            onConfirm={() => {
              cleanupModal()
              blocker.proceed?.()
            }}
            onClose={() => {
              cleanupModal()
              blocker.reset?.()
            }}
          />
        ),
      })
    } else if (blocker.state !== 'blocked') {
      cleanupModal()
    }
  }, [
    blocker.state,
    blocker.proceed,
    blocker.reset,
    pushModal,
    cleanupModal,
    alertTitle,
    alertMessage,
    confirmLabel,
    cancelLabel,
  ])

  useEffect(() => {
    return () => {
      cleanupModal()
    }
  }, [cleanupModal])

  return {
    isBlocked: blocker.state === 'blocked',
    proceed: () => {
      cleanupModal()
      blocker.proceed?.()
    },
    reset: () => {
      cleanupModal()
      blocker.reset?.()
    },
  }
}
