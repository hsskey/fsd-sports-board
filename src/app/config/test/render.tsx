import { ModalProvider } from '@/shared/ui/modal/modal-context'
import { MantineProvider } from '@mantine/core'
import { type RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactElement } from 'react'
import {
  Route,
  RouterProvider,
  createMemoryRouter,
  createRoutesFromElements,
} from 'react-router-dom'

export default async function customRender(
  component: ReactElement,
  { route = '/' } = {}
): Promise<RenderResult & { user: ReturnType<typeof userEvent.setup> }> {
  const routes = createRoutesFromElements(
    <Route path="/" element={<ModalProvider>{component}</ModalProvider>} />
  )

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
  })

  const user = userEvent.setup()

  return {
    user,
    ...render(
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    ),
  }
}
