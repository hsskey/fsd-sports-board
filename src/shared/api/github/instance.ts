import axios from 'axios'
import { GithubApiError } from './error'

export const GITHUB_API_URL = 'https://api.github.com'

export const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
})

githubApi.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  if (!token) {
    console.warn('Github token is not set')
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

githubApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      throw new GithubApiError(error)
    }
    throw error
  }
)
