import { Skeleton, Table } from '@mantine/core'

export function PostListSkeleton() {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="w-20">번호</Table.Th>
          <Table.Th>제목</Table.Th>
          <Table.Th className="w-32">작성자</Table.Th>
          <Table.Th className="w-32 text-right">작성일</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Array.from({ length: 10 }).map((_, index) => {
          const id = index
          return (
            <Table.Tr key={id}>
              <Table.Td>
                <Skeleton height={20} />
              </Table.Td>
              <Table.Td>
                <Skeleton height={20} />
              </Table.Td>
              <Table.Td>
                <Skeleton height={20} circle />
              </Table.Td>
              <Table.Td>
                <Skeleton height={20} />
              </Table.Td>
            </Table.Tr>
          )
        })}
      </Table.Tbody>
    </Table>
  )
}
