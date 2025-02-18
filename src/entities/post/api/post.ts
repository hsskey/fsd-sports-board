import { BOARD_CONFIG } from '@/entities/board/model/types'
import { GithubApiError } from '@/shared/api/github/error'
import { githubApi } from '@/shared/api/github/instance'
import axios from 'axios'
import type { GithubIssue, Post, PostListParams } from '../model/types'

export async function getPostList(
  boardType: 'golf' | 'soccer',
  params: PostListParams
): Promise<{ posts: Post[]; totalCount: number }> {
  const repo = BOARD_CONFIG[boardType === 'golf' ? 'GOLF' : 'SOCCER'].repo

  if (!repo) {
    throw new Error('Repository configuration is missing')
  }

  let searchQuery = `repo:${repo} is:issue state:open`

  if (params.keyword) {
    if (params.searchType === 'title') {
      searchQuery += ` in:title ${params.keyword}`
    } else if (params.searchType === 'body') {
      searchQuery += ` in:body ${params.keyword}`
    }
  }

  try {
    const response = await githubApi.get<{
      items: GithubIssue[]
      total_count: number
    }>('search/issues', {
      params: {
        q: searchQuery,
        page: params.page,
        per_page: params.perPage,
        sort: 'created',
        order: 'desc',
      },
    })

    return {
      posts: response.data.items.map(mapGithubIssueToPost),
      totalCount: response.data.total_count,
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
}

export async function getPostDetail(
  boardType: 'golf' | 'soccer',
  issueNumber: number
): Promise<Post> {
  const repo = BOARD_CONFIG[boardType === 'golf' ? 'GOLF' : 'SOCCER'].repo

  if (!repo) {
    throw new Error('Repository configuration is missing')
  }

  try {
    const [owner, repoName] = repo.split('/')
    const response = await githubApi.get<GithubIssue>(
      `repos/${owner}/${repoName}/issues/${issueNumber}`
    )

    return mapGithubIssueToPost(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
}

export async function deletePost(
  boardType: 'golf' | 'soccer',
  issueNumber: number
): Promise<void> {
  const repo = BOARD_CONFIG[boardType === 'golf' ? 'GOLF' : 'SOCCER'].repo

  if (!repo) {
    throw new Error('Repository configuration is missing')
  }

  try {
    const [owner, repoName] = repo.split('/')
    await githubApi.patch(`repos/${owner}/${repoName}/issues/${issueNumber}`, {
      state: 'closed',
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
}

export async function updatePost(
  boardType: 'golf' | 'soccer',
  issueNumber: number,
  title: string,
  content: string
): Promise<void> {
  const repo = BOARD_CONFIG[boardType === 'golf' ? 'GOLF' : 'SOCCER'].repo

  if (!repo) {
    throw new Error('Repository configuration is missing')
  }

  try {
    const [owner, repoName] = repo.split('/')
    await githubApi.patch(`repos/${owner}/${repoName}/issues/${issueNumber}`, {
      title,
      body: content,
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
}

export async function createPost(
  boardType: 'golf' | 'soccer',
  title: string,
  content: string
): Promise<Post> {
  const repo = BOARD_CONFIG[boardType === 'golf' ? 'GOLF' : 'SOCCER'].repo

  if (!repo) {
    throw new Error('Repository configuration is missing')
  }

  try {
    const [owner, repoName] = repo.split('/')
    const response = await githubApi.post<GithubIssue>(
      `repos/${owner}/${repoName}/issues`,
      {
        title,
        body: content,
      }
    )

    return mapGithubIssueToPost(response.data)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
}

function mapGithubIssueToPost(issue: GithubIssue): Post {
  return {
    id: issue.number,
    title: issue.title,
    content: issue.body,
    author: {
      name: issue.user.login,
      avatar: issue.user.avatar_url,
    },
    createdAt: issue.created_at,
  }
}
