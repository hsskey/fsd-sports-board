import { usePostList } from '@/entities/post/model/queries'

export function useRecentPosts(boardType: 'golf' | 'soccer') {
  return usePostList(boardType, {
    page: 1,
    perPage: 5,
    isRecent: true,
    searchType: '',
    keyword: '',
  })
}
