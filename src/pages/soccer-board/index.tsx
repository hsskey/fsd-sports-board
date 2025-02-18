import { PostList } from '@/features/post-list/ui/post-list'
import { usePageTitle } from '@/shared/hooks/use-page-title'
import { ErrorBoundary } from '@/shared/ui/error-boundary/error-boundary'
import { BoardLayout } from '@/widgets/board-layout/ui/board-layout'
import { Container } from '@mantine/core'

export default function SoccerBoardPage() {
  usePageTitle('축구게시판')

  return (
    <Container size="lg" className="py-8">
      <BoardLayout title="축구게시판">
        <ErrorBoundary>
          <PostList />
        </ErrorBoundary>
      </BoardLayout>
    </Container>
  )
}
