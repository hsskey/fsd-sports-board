import { BaseLayout } from '@/app/layouts/base-layout'
import { LoadingFallback } from '@/app/loading'
import PostCreatePage from '@/pages/post-create'
import { routePaths } from '@/shared/constants/routes'
import { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'

const HomePage = lazy(() => import('@/pages/home'))
const GolfBoard = lazy(() => import('@/pages/golf-board'))
const SoccerBoardPage = lazy(() => import('@/pages/soccer-board'))
const NotFoundPage = lazy(() => import('@/pages/not-found'))
const PostDetailPage = lazy(() => import('@/pages/post-detail'))
const PostEditPage = lazy(() => import('@/pages/post-edit'))

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: routePaths.HOME,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: routePaths.GOLF_BOARD,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <GolfBoard />
          </Suspense>
        ),
      },
      {
        path: routePaths.SOCCER_BOARD,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SoccerBoardPage />
          </Suspense>
        ),
      },
      {
        path: routePaths.POST_EDIT,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PostEditPage />
          </Suspense>
        ),
      },
      {
        path: routePaths.NOT_FOUND,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: '/:boardName/post/:id',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PostDetailPage />
          </Suspense>
        ),
      },
      {
        path: '/:boardName/post/create',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <PostCreatePage />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to={routePaths.NOT_FOUND} replace />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
