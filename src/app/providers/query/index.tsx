import { GithubApiError } from '@/shared/api/github/error'
import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { PropsWithChildren } from 'react'

export function QueryProvider({ children }: PropsWithChildren) {
  const { pushModal } = useModal()

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: Error) => {
        if (error instanceof GithubApiError) {
          pushModal({
            component: (
              <Alert
                isOpen={true}
                type="alert"
                title="오류 발생"
                message={error.message}
                confirmLabel="확인"
              />
            ),
          })
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: Error) => {
        if (error instanceof GithubApiError) {
          pushModal({
            component: (
              <Alert
                isOpen={true}
                type="alert"
                title="오류 발생"
                message={error.message}
                confirmLabel="확인"
              />
            ),
          })
        }
      },
    }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: (error) => error instanceof GithubApiError,
        gcTime: 1000 * 60 * 5,
        staleTime: 1000 * 60,
      },
      mutations: {
        throwOnError: (error) => error instanceof GithubApiError,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
