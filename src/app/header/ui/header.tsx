import { routePaths } from '@/shared/constants/routes.ts'
import { Container, Group } from '@mantine/core'
import clsx from 'clsx'
import { Link, useLocation } from 'react-router-dom'

export function Header() {
  const location = useLocation()

  const isCurrentPath = (path: string) => location.pathname === path

  const linkClasses = (path: string) =>
    clsx(
      'text-lg font-medium transition-colors duration-200',
      'hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      {
        'text-blue-600': isCurrentPath(path),
        'text-gray-900': !isCurrentPath(path),
      }
    )
  return (
    <header className="border-gray-200 border-b bg-white py-6 shadow-sm">
      <Container size="lg">
        <nav aria-label="메인 네비게이션">
          <Group justify="center" gap={48}>
            <Link
              to={routePaths.HOME}
              className={linkClasses(routePaths.HOME)}
              aria-current={isCurrentPath(routePaths.HOME) ? 'page' : undefined}
            >
              홈
            </Link>
            <Link
              to={routePaths.GOLF_BOARD}
              className={linkClasses(routePaths.GOLF_BOARD)}
              aria-current={
                isCurrentPath(routePaths.GOLF_BOARD) ? 'page' : undefined
              }
            >
              골프게시판
            </Link>
            <Link
              to={routePaths.SOCCER_BOARD}
              className={linkClasses(routePaths.SOCCER_BOARD)}
              aria-current={
                isCurrentPath(routePaths.SOCCER_BOARD) ? 'page' : undefined
              }
            >
              축구게시판
            </Link>
          </Group>
        </nav>
      </Container>
    </header>
  )
}
