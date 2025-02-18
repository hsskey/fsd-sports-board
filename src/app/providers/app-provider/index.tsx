import { focusableButtonClasses } from '@/shared/ui/button/styles'
import { ModalProvider } from '@/shared/ui/modal/modal-context'
import { MantineProvider } from '@mantine/core'
import type { PropsWithChildren } from 'react'
import { MultiProvider } from '../multi-provider'
import { QueryProvider } from '../query'

export function AppProviders({ children }: PropsWithChildren) {
  const providers = [
    <MantineProvider
      key="mantine"
      theme={{
        components: {
          Button: {
            defaultProps: {
              className: focusableButtonClasses,
            },
          },
        },
      }}
    />,
    // @ts-expect-error Provider does not need children here
    <ModalProvider key="modal" />,
    <QueryProvider key="query" />,
  ]

  return <MultiProvider providers={providers}>{children}</MultiProvider>
}
