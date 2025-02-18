export interface GithubErrorResponse {
  message: string
  documentation_url: string
  errors?: Array<{
    resource: string
    field: string
    code: string
    message?: string
  }>
}

export interface GithubPaginationParams {
  per_page?: number
  page?: number
}

export type ApiError = {
  status: number
  message: string
  code?: string
  documentationUrl?: string
}

export type ApiResponse<T> = {
  data: T
  meta?: {
    totalCount?: number
    currentPage?: number
    totalPages?: number
  }
}
