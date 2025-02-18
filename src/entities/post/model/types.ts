export interface GithubIssue {
  number: number
  title: string
  body: string
  user: {
    login: string
    avatar_url: string
  }
  created_at: string
  updated_at: string
}

export interface Post {
  id: number
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
  createdAt: string
}

export interface PostListResponse {
  posts: Post[]
  totalCount: number
}

export interface PostListParams {
  page: number
  perPage: number
  searchType: 'title' | 'body' | ''
  keyword: string
}
