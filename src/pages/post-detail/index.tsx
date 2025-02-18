import { PostDetail } from '@/features/post-detail/ui/post-detail'
import { usePageTitle } from '@/shared/hooks/use-page-title'

export default function PostDetailPage() {
  usePageTitle('게시글 상세')

  return <PostDetail />
}
