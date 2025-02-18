import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPost, deletePost, updatePost } from '../api/post'
import {
  type ExtendedPostListParams,
  POST_QUERY_KEY,
  cacheUtils,
} from './queries'
import type { Post, PostListResponse } from './types'

export function useCreatePost(boardType: 'golf' | 'soccer') {
  const queryClient = useQueryClient()
  const defaultParams = cacheUtils.getDefaultParams()
  const recentParams: ExtendedPostListParams = {
    ...cacheUtils.getDefaultParams(5),
    isRecent: true,
  }

  return useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) => {
      return createPost(boardType, title, content)
    },
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(
        POST_QUERY_KEY.detail(boardType, newPost.id),
        newPost
      )

      cacheUtils.updateListCache(
        queryClient,
        boardType,
        defaultParams,
        (old: PostListResponse) => ({
          ...old,
          posts: [newPost, ...old.posts],
          totalCount: (old.totalCount || 0) + 1,
        })
      )

      cacheUtils.updateListCache(
        queryClient,
        boardType,
        recentParams,
        (old: PostListResponse) => ({
          ...old,
          posts: [newPost, ...old.posts].slice(0, 5),
          totalCount: (old.totalCount || 0) + 1,
        })
      )

      setTimeout(async () => {
        await queryClient.invalidateQueries({
          queryKey: POST_QUERY_KEY.list(boardType, defaultParams),
        })
      }, 2000)
    },
  })
}

export function useDeletePost(boardType: 'golf' | 'soccer') {
  const queryClient = useQueryClient()
  const defaultParams = cacheUtils.getDefaultParams()
  const recentParams: ExtendedPostListParams = {
    ...cacheUtils.getDefaultParams(5),
    isRecent: true,
  }

  return useMutation({
    mutationFn: (postId: number) => deletePost(boardType, postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: POST_QUERY_KEY.lists() })

      const previousData = {
        main: queryClient.getQueryData(
          POST_QUERY_KEY.list(boardType, defaultParams)
        ),
        recent: queryClient.getQueryData(
          POST_QUERY_KEY.list(boardType, recentParams)
        ),
      }

      const updateFn = (old: PostListResponse) => ({
        ...old,
        posts: old.posts.filter((post: Post) => post.id !== postId),
        totalCount: Math.max(0, (old.totalCount || 0) - 1),
      })

      cacheUtils.updateListCache(
        queryClient,
        boardType,
        defaultParams,
        updateFn
      )
      cacheUtils.updateListCache(queryClient, boardType, recentParams, updateFn)

      return previousData
    },
    onError: (_err, _postId, context) => {
      if (context) {
        queryClient.setQueryData(
          POST_QUERY_KEY.list(boardType, defaultParams),
          context.main
        )
        queryClient.setQueryData(
          POST_QUERY_KEY.list(boardType, recentParams),
          context.recent
        )
      }
    },
    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEY.lists() })
    },
  })
}

export function useUpdatePost(boardType: 'golf' | 'soccer') {
  const queryClient = useQueryClient()
  const defaultParams = cacheUtils.getDefaultParams()
  const recentParams: ExtendedPostListParams = {
    ...cacheUtils.getDefaultParams(5),
    isRecent: true,
  }

  return useMutation({
    mutationFn: ({
      postId,
      title,
      content,
    }: {
      postId: number
      title: string
      content: string
    }) => {
      return updatePost(boardType, postId, title, content)
    },
    onMutate: async ({ postId, title, content }) => {
      await queryClient.cancelQueries({
        queryKey: POST_QUERY_KEY.detail(boardType, postId),
      })

      const previousData = {
        detail: queryClient.getQueryData(
          POST_QUERY_KEY.detail(boardType, postId)
        ),
        main: queryClient.getQueryData(
          POST_QUERY_KEY.list(boardType, defaultParams)
        ),
        recent: queryClient.getQueryData(
          POST_QUERY_KEY.list(boardType, recentParams)
        ),
      }

      queryClient.setQueryData(
        POST_QUERY_KEY.detail(boardType, postId),
        (old: Post) => ({
          ...old,
          title,
          content,
        })
      )

      const updateFn = (old: PostListResponse) => ({
        ...old,
        posts: old.posts.map((post: Post) =>
          post.id === postId ? { ...post, title, content } : post
        ),
      })

      cacheUtils.updateListCache(
        queryClient,
        boardType,
        defaultParams,
        updateFn
      )
      cacheUtils.updateListCache(queryClient, boardType, recentParams, updateFn)

      return previousData
    },
    onError: (_err, { postId }, context) => {
      if (context) {
        queryClient.setQueryData(
          POST_QUERY_KEY.detail(boardType, postId),
          context.detail
        )
        queryClient.setQueryData(
          POST_QUERY_KEY.list(boardType, defaultParams),
          context.main
        )
        queryClient.setQueryData(
          POST_QUERY_KEY.list(boardType, recentParams),
          context.recent
        )
      }
    },
    onSettled: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      await queryClient.invalidateQueries({ queryKey: POST_QUERY_KEY.lists() })
    },
  })
}
