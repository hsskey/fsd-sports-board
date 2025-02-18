import { Paper, Title } from '@mantine/core'
import type { PropsWithChildren } from 'react'

interface BoardLayoutProps extends PropsWithChildren {
  title: string
}

export function BoardLayout({ title, children }: BoardLayoutProps) {
  return (
    <Paper className="flex min-h-[calc(100vh-200px)] flex-col overflow-hidden rounded-lg p-4 shadow-sm md:p-6">
      <Title order={2} className="mb-4 font-bold text-xl md:mb-6 md:text-2xl">
        {title}
      </Title>
      <div className="flex-1 overflow-auto">{children}</div>
    </Paper>
  )
}
