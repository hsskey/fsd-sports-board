import render from '@/app/config/test/render'
import { screen } from '@testing-library/react'
import NotFound from '../index'

const navigateFn = vi.fn()

vi.mock('react-router-dom', async () => {
  const original = (await vi.importActual('react-router-dom')) as typeof import(
    'react-router-dom'
  )
  return { ...original, useNavigate: () => navigateFn }
})

it('홈으로 가기 링크를 클릭할 경우 "/"경로로 navigate 함수가 호출된다', async () => {
  const { user } = await render(<NotFound />)
  await user.click(screen.getByText('홈으로 가기'))
  expect(navigateFn).toHaveBeenNthCalledWith(1, '/')
})
