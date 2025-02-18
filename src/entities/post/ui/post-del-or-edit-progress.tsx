import { Loader, Modal, Stack, Text } from '@mantine/core'

interface PostDelOrEditProgressProps {
  isOpen: boolean
}

export function PostDelOrEditProgress({ isOpen }: PostDelOrEditProgressProps) {
  return (
    <Modal
      opened={isOpen}
      onClose={() => {}}
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      centered
      size="sm"
    >
      <Stack align="center" py="xl">
        <Loader size="lg" />
        <Text size="sm" c="dimmed">
          Loading...
        </Text>
      </Stack>
    </Modal>
  )
}
