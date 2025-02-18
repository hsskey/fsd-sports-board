import { BOARD_CONFIG } from '@/entities/board/model/types'
import { PostDelOrEditProgress } from '@/entities/post/ui/post-del-or-edit-progress'
import { PostDeleteButton } from '@/features/post-delete/ui/post-delete-button'
import { usePostEditForm } from '@/features/post-edit/model/use-post-edit-form'
import { PostEditButton } from '@/features/post-edit/ui/post-edit-button'
import { PostEditForm } from '@/features/post-edit/ui/post-edit-form'
import { ErrorBoundary } from '@/shared/ui/error-boundary/error-boundary'
import {
  Avatar,
  Button,
  Container,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePostDetail } from '../model/use-post-detail'

export function PostDetail() {
  const { boardName, id } = useParams<{ boardName: string; id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  const boardType = boardName === 'golf-board' ? 'golf' : 'soccer'
  const postId = Number(id)

  const { post, isLoading, isDeleting, isEditing, handleDelete, handleEdit } =
    usePostDetail(boardType, postId)

  const {
    isEditing: isEditFormOpen,
    startEditing,
    stopEditing,
  } = usePostEditForm()

  const handleList = () => {
    navigate(`/${boardName}`)
  }

  const pathSegments = location.pathname.split('/')
  const section = pathSegments[1]
  const boardTitle =
    BOARD_CONFIG[section === 'golf-board' ? 'GOLF' : 'SOCCER'].title

  if (isLoading || !post || !boardName) {
    return (
      <Container size="lg" className="py-8">
        <Stack align="center" justify="center" h={400}>
          <Loader size="lg" />
        </Stack>
      </Container>
    )
  }

  const formattedDate = format(
    new Date(post.createdAt),
    'yyyy-MM-dd HH:mm:ss',
    { locale: ko }
  )

  return (
    <>
      <Container size="lg" className="py-8">
        <ErrorBoundary>
          <Paper className="overflow-hidden rounded-lg p-4 shadow-sm md:p-6">
            <Title
              order={2}
              className="mb-4 font-bold text-xl md:mb-6 md:text-2xl"
            >
              {boardTitle}
            </Title>

            <div className="mb-6 border-b pb-4 md:mb-8">
              {isEditFormOpen ? (
                <PostEditForm
                  initialTitle={post.title}
                  initialContent={post.content}
                  onSave={(title, content) => {
                    handleEdit(postId, boardName, title, content)
                    stopEditing()
                  }}
                  onCancel={stopEditing}
                />
              ) : (
                <>
                  <Title order={3} className="mb-4 break-all">
                    {post.title}
                  </Title>
                  <Group justify="space-between" wrap="nowrap">
                    <Group wrap="nowrap">
                      <Avatar src={post.author.avatar} size="md" radius="xl" />
                      <div className="min-w-0">
                        <Text size="sm" fw={500} className="truncate">
                          {post.author.name}
                        </Text>
                        <Text size="sm" c="dimmed">
                          {formattedDate}
                        </Text>
                      </div>
                    </Group>
                  </Group>
                </>
              )}
            </div>

            {!isEditFormOpen && (
              <div className="mb-6 overflow-auto md:mb-8">
                <Text className="whitespace-pre-wrap break-all">
                  {post.content}
                </Text>
              </div>
            )}

            <Group
              justify="space-between"
              className="sticky bottom-0 border-t bg-white pt-4"
            >
              <Group>
                {isEditFormOpen ? null : (
                  <>
                    <PostEditButton onClick={startEditing} />
                    <PostDeleteButton
                      onDelete={() => handleDelete(postId, boardName)}
                    />
                  </>
                )}
              </Group>
              {!isEditFormOpen && (
                <Button variant="light" onClick={handleList}>
                  목록
                </Button>
              )}
            </Group>
          </Paper>
        </ErrorBoundary>
      </Container>
      <PostDelOrEditProgress isOpen={isDeleting || isEditing} />
    </>
  )
}
