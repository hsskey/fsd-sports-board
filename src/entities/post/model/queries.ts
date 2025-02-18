import { type QueryClient, useQuery } from '@tanstack/react-query'
import { getPostDetail, getPostList } from '../api/post'
import type { PostListParams, PostListResponse } from './types'

export type ExtendedPostListParams = PostListParams & { isRecent?: boolean }

export const POST_QUERY_KEY = {
  all: ['posts'] as const,
  lists: () => [...POST_QUERY_KEY.all, 'list'] as const,
  list: (boardType: string, params: ExtendedPostListParams) =>
    [...POST_QUERY_KEY.lists(), boardType, params] as const,
  detail: (boardType: string, id: number) =>
    [...POST_QUERY_KEY.all, 'detail', boardType, id] as const,
}

export const cacheUtils = {
  getDefaultParams: (perPage = 10): PostListParams => ({
    page: 1,
    perPage,
    searchType: '',
    keyword: '',
  }),

  updateListCache: (
    queryClient: QueryClient,
    boardType: string,
    params: ExtendedPostListParams,
    updateFn: (old: PostListResponse) => PostListResponse
  ) => {
    queryClient.setQueryData(
      POST_QUERY_KEY.list(boardType, params),
      (old: PostListResponse) => {
        if (!old?.posts) return { posts: [], totalCount: 0 }
        return updateFn(old)
      }
    )
  },
}

export function usePostList(
  boardType: 'golf' | 'soccer',
  params: ExtendedPostListParams
) {
  return useQuery({
    queryKey: POST_QUERY_KEY.list(boardType, params),
    queryFn: () => getPostList(boardType, params),
    staleTime: params.isRecent ? 1000 * 60 : 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}

export function usePostDetail(boardType: 'golf' | 'soccer', id: number) {
  return useQuery({
    queryKey: POST_QUERY_KEY.detail(boardType, id),
    queryFn: () => getPostDetail(boardType, id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  })
}
