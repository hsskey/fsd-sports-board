import { Button } from '@mantine/core'

interface PostEditButtonProps {
  onClick: () => void
}

export function PostEditButton({ onClick }: PostEditButtonProps) {
  return (
    <Button variant="light" onClick={onClick}>
      수정
    </Button>
  )
}
