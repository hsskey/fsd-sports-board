import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { Button } from '@mantine/core'

interface PostDeleteButtonProps {
  onDelete: () => void
}

export function PostDeleteButton({ onDelete }: PostDeleteButtonProps) {
  const { pushModal, popModal } = useModal()

  const handleDelete = () => {
    const triggerElement = document.activeElement
    pushModal({
      component: (
        <Alert
          isOpen={true}
          type="confirm"
          message="삭제하시겠습니까?"
          confirmLabel="삭제"
          cancelLabel="취소"
          onConfirm={onDelete}
          onClose={popModal}
        />
      ),
      triggerElement: triggerElement as HTMLElement,
    })
  }

  return (
    <Button variant="light" color="red" onClick={handleDelete}>
      삭제
    </Button>
  )
}
