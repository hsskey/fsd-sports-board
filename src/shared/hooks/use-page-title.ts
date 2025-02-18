import { useEffect } from 'react'

const BASE_TITLE = '홈'

export function usePageTitle(title: string) {
  useEffect(() => {
    const newTitle = title ? title : BASE_TITLE
    document.title = newTitle

    return () => {
      document.title = BASE_TITLE
    }
  }, [title])
}
