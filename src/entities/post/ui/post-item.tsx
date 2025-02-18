import { Avatar, Table } from '@mantine/core'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Post } from '../model/types'

interface PostItemProps {
  post: Post
}

export function PostItem({ post }: PostItemProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const boardName = location.pathname.split('/')[1]

  const formattedDate = format(
    new Date(post.createdAt),
    'yyyy-MM-dd HH:mm:ss',
    {
      locale: ko,
    }
  )

  const handleClick = () => {
    navigate(`/${boardName}/post/${post.id}`)
  }

  return (
    <Table.Tr className="cursor-pointer hover:bg-gray-50" onClick={handleClick}>
      <Table.Td className="w-20 text-center">{post.id}</Table.Td>
      <Table.Td className="max-w-0 flex-1">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap pr-4">
          {post.title}
        </div>
      </Table.Td>
      <Table.Td className="w-32">
        <div className="flex items-center gap-2">
          <Avatar src={post.author.avatar} size="sm" radius="xl" />
          <span className="text-gray-600 text-sm">{post.author.name}</span>
        </div>
      </Table.Td>
      <Table.Td className="w-40 text-right text-gray-500">
        {formattedDate}
      </Table.Td>
    </Table.Tr>
  )
}
