import { useCallback, useRef } from 'react'

export function useFocusManagement() {
  const focusHistoryRef = useRef<HTMLElement[]>([])

  const saveFocus = useCallback(() => {
    const activeElement = document.activeElement as HTMLElement
    focusHistoryRef.current.push(activeElement)
  }, [])

  const restoreFocus = useCallback(() => {
    const previousFocus = focusHistoryRef.current.pop()
    if (previousFocus) {
      previousFocus.focus()
    }
  }, [])

  return { saveFocus, restoreFocus, focusHistory: focusHistoryRef.current }
}
