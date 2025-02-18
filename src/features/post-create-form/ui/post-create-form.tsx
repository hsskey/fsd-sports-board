import { useAutoFocus } from '@/shared/hooks/use-auto-focus'
import { usePreventExit } from '@/shared/hooks/use-prevent-exit'
import { Button, Group, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useCallback, useState } from 'react'

interface PostCreateFormProps {
  onSubmit: (title: string, content: string) => void
}

interface FormValues {
  title: string
  content: string
}

export function PostCreateForm({ onSubmit }: PostCreateFormProps) {
  const titleRef = useAutoFocus()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      content: '',
    },
    validate: {
      title: (value) => (!value.trim() ? '제목을 입력해주세요.' : null),
      content: (value) => (!value.trim() ? '내용을 입력해주세요.' : null),
    },
    validateInputOnBlur: true,
  })

  const isDirty = useCallback(() => form.isDirty(), [form])

  usePreventExit({
    isDirty: isDirty() && !isSubmitting,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validation = form.validate()

    if (validation.hasErrors) {
      form.setTouched({
        title: true,
        content: true,
      })
      return
    }

    setIsSubmitting(true)
    await onSubmit(form.values.title, form.values.content)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-h-[calc(100vh-200px)] flex-col"
    >
      <div className="flex-1 space-y-6">
        <TextInput
          ref={titleRef}
          required
          label="제목"
          {...form.getInputProps('title')}
          placeholder="제목"
          size="lg"
          classNames={{
            input: `text-lg border-2 ${
              form.errors.title
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'focus:border-blue-500 focus:ring-blue-500'
            }`,
            error: 'text-red-500 text-sm mt-1',
            label: 'text-base font-medium mb-1',
          }}
          error={form.errors.title}
        />

        <Textarea
          required
          label="내용"
          {...form.getInputProps('content')}
          placeholder="내용"
          minRows={10}
          maxRows={20}
          autosize
          size="md"
          classNames={{
            input: `min-h-[300px] max-h-[500px] overflow-y-auto text-base leading-relaxed border-2 ${
              form.errors.content
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'focus:border-blue-500 focus:ring-blue-500'
            }`,
            error: 'text-red-500 text-sm mt-1',
            label: 'text-base font-medium mb-1',
          }}
          error={form.errors.content}
        />
      </div>

      <Group
        justify="flex-end"
        gap="sm"
        className="sticky bottom-0 mt-6 border-t bg-white py-4"
      >
        <Button type="submit" size="lg">
          등록
        </Button>
      </Group>
    </form>
  )
}
