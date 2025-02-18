export interface BoardConfig {
  title: string
  path: string
  repo: string
}

export const BOARD_CONFIG = {
  GOLF: {
    title: '골프게시판',
    path: 'golf-board',
    repo: import.meta.env.VITE_GOLF_REPO,
  },
  SOCCER: {
    title: '축구게시판',
    path: 'soccer',
    repo: import.meta.env.VITE_SOCCER_REPO,
  },
} as const

export interface BoardConfig {
  title: string
  path: string
  repo: string
}
