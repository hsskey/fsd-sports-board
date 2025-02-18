import { ImageRoller } from '@/features/image-roller/ui/image-roller'
import { usePageTitle } from '@/shared/hooks/use-page-title'
import { BoardSection } from '@/widgets/board-section/ui/board-section'
import { Container } from '@mantine/core'

export default function HomePage() {
  usePageTitle('홈')
  return (
    <Container size="lg">
      <ImageRoller />
      <BoardSection />
    </Container>
  )
}
