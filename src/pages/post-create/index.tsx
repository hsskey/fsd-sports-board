import { BOARD_CONFIG } from '@/entities/board/model/types'
import { useCreatePost } from '@/entities/post/model/mutations'
import { PostCreateForm } from '@/features/post-create-form/ui/post-create-form'
import { usePageTitle } from '@/shared/hooks/use-page-title'
import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { Container, Paper, Title } from '@mantine/core'
import { useNavigate, useParams } from 'react-router-dom'

export default function PostCreatePage() {
  const navigate = useNavigate()
  const { boardName } = useParams()
  const { pushModal } = useModal()
  usePageTitle('글쓰기')

  const boardType = boardName === 'golf-board' ? 'golf' : 'soccer'
  const boardTitle =
    BOARD_CONFIG[boardName === 'golf-board' ? 'GOLF' : 'SOCCER'].title
  const createPostMutation = useCreatePost(boardType)

  const handleSubmit = async (title: string, content: string) => {
    try {
      const result = await createPostMutation.mutateAsync({ title, content })
      navigate(`/${boardName}/post/${result.id}`)
    } catch (error) {
      console.error('Failed to create post:', error)
      pushModal({
        component: (
          <Alert
            isOpen={true}
            type="alert"
            title="오류 발생"
            message="게시글 등록 중 오류가 발생했습니다."
            confirmLabel="확인"
          />
        ),
      })
    }
  }
  return (
    <Container size="lg" className="py-8">
      <Paper className="rounded-lg p-6 shadow-sm">
        <Title order={2} className="mb-6 font-bold text-2xl">
          {boardTitle}
        </Title>
        <PostCreateForm onSubmit={handleSubmit} />
      </Paper>
    </Container>
  )
}
