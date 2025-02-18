import { routePaths } from '@/shared/constants/routes'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  const handleClickBack = () => {
    navigate(routePaths.HOME)
  }
  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="font-bold text-4xl text-red-500">404</h1>
      <p className="mt-4 mb-6">페이지를 찾을 수 없습니다</p>
      <Button
        className="transition-transform hover:scale-105"
        color="blue"
        onClick={handleClickBack}
        radius="md"
        size="md"
        variant="filled"
      >
        홈으로 가기
      </Button>
    </div>
  )
}
