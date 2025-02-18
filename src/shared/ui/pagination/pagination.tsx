import { Button, Group } from '@mantine/core'
import clsx from 'clsx'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pageGroup = Math.ceil(currentPage / 10)
  const startPage = (pageGroup - 1) * 10 + 1
  const endPage = Math.min(pageGroup * 10, totalPages)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages
  const isFirstGroup = startPage === 1
  const isLastGroup = endPage === totalPages

  const buttonClass = clsx(
    'w-8 h-8 flex items-center justify-center rounded',
    'hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none'
  )

  return (
    <Group justify="center" gap="xs">
      <Button
        disabled={isFirstPage}
        onClick={() => onPageChange(1)}
        className={buttonClass}
        variant="subtle"
      >
        {'<<'}
      </Button>
      <Button
        disabled={isFirstGroup}
        onClick={() => onPageChange(startPage - 10)}
        className={buttonClass}
        variant="subtle"
      >
        {'<'}
      </Button>

      {Array.from({ length: endPage - startPage + 1 }).map((_, idx) => {
        const pageNumber = startPage + idx
        return (
          <Button
            key={pageNumber}
            onClick={() => onPageChange(startPage + idx)}
            className={clsx(buttonClass, {
              'bg-blue-500 text-white': currentPage === startPage + idx,
            })}
            variant="subtle"
          >
            {startPage + idx}
          </Button>
        )
      })}

      <Button
        disabled={isLastGroup}
        onClick={() => onPageChange(startPage + 10)}
        className={buttonClass}
        variant="subtle"
      >
        {'>'}
      </Button>
      <Button
        disabled={isLastPage}
        onClick={() => onPageChange(totalPages)}
        className={buttonClass}
        variant="subtle"
      >
        {'>>'}
      </Button>
    </Group>
  )
}
