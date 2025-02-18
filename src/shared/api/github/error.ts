import type { AxiosError } from 'axios'
import type { GithubErrorResponse } from './types'

export class GithubApiError extends Error {
  public status?: number
  public errors?: GithubErrorResponse['errors']
  public documentation_url?: string

  constructor(error: AxiosError<GithubErrorResponse>) {
    const message = error.response?.data?.message || error.message
    super(message)

    this.name = 'GithubApiError'
    this.status = error.response?.status
    this.errors = error.response?.data?.errors
    this.documentation_url = error.response?.data?.documentation_url
  }

  static fromError(error: AxiosError<GithubErrorResponse>): GithubApiError {
    return new GithubApiError(error)
  }
}
