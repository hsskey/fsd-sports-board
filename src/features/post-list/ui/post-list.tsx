import { POST_LIST_CONFIG } from '@/entities/post/model/constants'
import { PostEmpty } from '@/entities/post/ui/post-empty'
import { PostItem } from '@/entities/post/ui/post-item'
import { PostListSkeleton } from '@/entities/post/ui/post-list-skeleton'
import { PostSearchForm } from '@/features/post-search/ui/post-search-form'
import { Pagination } from '@/shared/ui/pagination/pagination'
import { Button, Stack, Table } from '@mantine/core'
import { useLocation, useNavigate } from 'react-router-dom'
import { usePostList } from '../model/use-post-list'

export function PostList() {
  const location = useLocation()
  const navigate = useNavigate()
  const boardType = location.pathname.includes('golf-board') ? 'golf' : 'soccer'

  const {
    posts,
    totalCount,
    isLoading,
    searchState,
    setSearchState,
    handleSearch,
  } = usePostList(boardType)

  const handleWrite = () => {
    const boardName = location.pathname.split('/')[1]
    navigate(`/${boardName}/post/create`)
  }

  if (isLoading) {
    return (
      <Stack gap="md">
        <div className="flex justify-between">
          <PostSearchForm onSearch={handleSearch} />
          <Button onClick={handleWrite}>글쓰기</Button>
        </div>
        <PostListSkeleton />
      </Stack>
    )
  }

  if (!posts || !posts.length) {
    return (
      <Stack gap="md">
        <div className="flex justify-between">
          <PostSearchForm onSearch={handleSearch} />
          <Button onClick={handleWrite}>글쓰기</Button>
        </div>
        <PostEmpty />
      </Stack>
    )
  }

  return (
    <Stack gap="md" className="flex h-full flex-col">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <PostSearchForm onSearch={handleSearch} />
        <Button onClick={handleWrite}>글쓰기</Button>
      </div>

      <div className="relative flex-1 overflow-x-auto">
        <Table>
          <Table.Thead className="sticky top-0 bg-white">
            <Table.Tr>
              <Table.Th className="w-16 text-center md:w-20">번호</Table.Th>
              <Table.Th className="text-center">제목</Table.Th>
              <Table.Th className="w-24 text-center md:w-32">작성자</Table.Th>
              <Table.Th className="w-24 text-right md:w-32">작성일</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </Table.Tbody>
        </Table>
      </div>

      <div className="sticky bottom-0 mt-auto border-t bg-white py-4">
        <Pagination
          currentPage={searchState.currentPage}
          totalPages={Math.ceil(totalCount / POST_LIST_CONFIG.ITEMS_PER_PAGE)}
          onPageChange={(page) =>
            setSearchState((prev) => ({
              ...prev,
              currentPage: page,
            }))
          }
        />
      </div>
    </Stack>
  )
}
