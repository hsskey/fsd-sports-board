import type { BoardConfig } from '@/entities/board/model/types'
import { RecentPostsList } from '@/features/recent-posts/ui/recent-posts-list'

interface BoardListProps {
  config: BoardConfig
}

export function BoardList({ config }: BoardListProps) {
  return <RecentPostsList config={config} />
}
