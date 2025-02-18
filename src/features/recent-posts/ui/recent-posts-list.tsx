import type { BoardConfig } from '@/entities/board/model/types'
import { routePaths } from '@/shared/constants/routes'
import { formatPostDate } from '@/shared/lib/utils/date.ts'
import { Card, Loader, Stack, Text, Title } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { useRecentPosts } from '../model/use-recent-posts'

interface RecentPostsListProps {
  config: BoardConfig
}

export function RecentPostsList({ config }: RecentPostsListProps) {
  const navigate = useNavigate()
  const { data, isLoading } = useRecentPosts(
    config.path === 'golf-board' ? 'golf' : 'soccer'
  )

  const handleClick = (postId: number) => {
    navigate(`/${config.path}/post/${postId}`)
  }

  const handleTitleClick = () => {
    const path =
      config.path === 'golf-board'
        ? routePaths.GOLF_BOARD
        : routePaths.SOCCER_BOARD

    navigate(`${path}`)
  }

  if (isLoading) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} mb="md" className="font-bold text-lg">
          {config.title}
        </Title>
        <Stack align="center" justify="center" className="min-h-[300px]">
          <Loader />
        </Stack>
      </Card>
    )
  }

  if (!data?.posts?.length) {
    return (
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} mb="md" className="font-bold text-lg">
          {config.title}
        </Title>
        <Stack
          align="center"
          justify="center"
          className="min-h-[300px] bg-gray-50"
        >
          <Text c="dimmed">등록된 게시글이 없습니다.</Text>
        </Stack>
      </Card>
    )
  }

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Title
        order={3}
        mb="md"
        className="font-bold text-lg cursor-pointer"
        onClick={handleTitleClick}
      >
        {config.title}
      </Title>
      <Stack gap="xs" className="min-h-[300px]">
        {data.posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClick(post.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClick(post.id)
              }
            }}
            className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-gray-50"
          >
            <Text size="sm" lineClamp={1} className="flex-1">
              {post.title}
            </Text>
            <Text size="sm" c="dimmed" className="ml-4 whitespace-nowrap">
              {formatPostDate(post.createdAt)}
            </Text>
          </div>
        ))}
      </Stack>
    </Card>
  )
}
