import { Center, Loader, Stack, Text } from '@mantine/core'

export function LoadingFallback() {
  return (
    <Center className="min-h-[50vh]">
      <Stack align="center" gap="xs">
        <Loader size="lg" type="dots" />
        <Text size="sm" c="dimmed">
          페이지를 불러오는 중입니다...
        </Text>
      </Stack>
    </Center>
  )
}
