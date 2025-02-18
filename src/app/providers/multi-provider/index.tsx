import { cloneElement } from 'react'
import type { PropsWithChildren, ReactElement } from 'react'

interface MultiProviderProps {
  providers: ReactElement[]
}

export function MultiProvider({
  providers,
  children,
}: PropsWithChildren<MultiProviderProps>): ReactElement {
  return (
    <>
      {providers.reduceRight((accProviders, provider) => {
        return cloneElement(provider, {}, accProviders)
      }, children)}
    </>
  )
}
