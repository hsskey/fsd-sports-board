import { Stack, Table, Text } from '@mantine/core'

export function PostEmpty() {
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="w-20 text-center">번호</Table.Th>
            <Table.Th className="text-center">제목</Table.Th>
            <Table.Th className="w-32 text-center">작성자</Table.Th>
            <Table.Th className="w-32 text-right">작성일</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td colSpan={4}>
              <Stack
                align="center"
                justify="center"
                h={300}
                className="bg-gray-50"
              >
                <Text c="dimmed">등록된 게시글이 없습니다.</Text>
              </Stack>
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </div>
  )
}
