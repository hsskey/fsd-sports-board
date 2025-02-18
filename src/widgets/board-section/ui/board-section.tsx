import { BOARD_CONFIG } from '@/entities/board/model/types'
import { ErrorBoundary } from '@/shared/ui/error-boundary/error-boundary'
import { Grid } from '@mantine/core'
import { BoardList } from './board-list'

export function BoardSection() {
  return (
    <ErrorBoundary>
      <Grid gutter="lg" className="mt-6">
        <Grid.Col span={6}>
          <BoardList config={BOARD_CONFIG.GOLF} />
        </Grid.Col>
        <Grid.Col span={6}>
          <BoardList config={BOARD_CONFIG.SOCCER} />
        </Grid.Col>
      </Grid>
    </ErrorBoundary>
  )
}
