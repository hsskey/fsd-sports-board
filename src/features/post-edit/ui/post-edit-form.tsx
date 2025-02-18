import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { Button, Group, TextInput, Textarea } from '@mantine/core'
import { useState } from 'react'

interface PostEditFormProps {
  initialTitle: string
  initialContent: string
  onSave: (title: string, content: string) => void
  onCancel: () => void
}

export function PostEditForm({
  initialTitle,
  initialContent,
  onSave,
  onCancel,
}: PostEditFormProps) {
  const [editTitle, setEditTitle] = useState(initialTitle)
  const [editContent, setEditContent] = useState(initialContent)
  const { pushModal } = useModal()

  const handleCancelEdit = () => {
    if (editTitle !== initialTitle || editContent !== initialContent) {
      pushModal({
        component: (
          <Alert
            isOpen={true}
            type="confirm"
            title="수정 취소"
            message="변경사항이 있습니다. 정말 취소하시겠습니까?"
            confirmLabel="확인"
            cancelLabel="취소"
            onConfirm={onCancel}
          />
        ),
      })
    } else {
      onCancel()
    }
  }

  return (
    <div className="space-y-6">
      <TextInput
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        placeholder="제목을 입력하세요"
        required
        size="lg"
        classNames={{
          input: 'text-lg md:text-xl font-medium',
        }}
      />
      <Textarea
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        placeholder="내용을 입력하세요"
        required
        minRows={20}
        autosize
        classNames={{
          input: 'text-base leading-relaxed min-h-[300px] max-h-[600px]',
        }}
      />
      <Group justify="flex-start">
        <Button
          variant="filled"
          color="blue"
          onClick={() => onSave(editTitle, editContent)}
        >
          저장
        </Button>
        <Button variant="light" color="gray" onClick={handleCancelEdit}>
          취소
        </Button>
      </Group>
    </div>
  )
}
