import { Alert } from '@/shared/ui/alert/alert'
import { useModal } from '@/shared/ui/modal/hooks/use-modal'
import { Button, Group, Select, TextInput } from '@mantine/core'
import { useState } from 'react'

interface PostSearchFormProps {
  onSearch: (searchType: 'title' | 'body', keyword: string) => void
}

export function PostSearchForm({ onSearch }: PostSearchFormProps) {
  const [searchType, setSearchType] = useState<'title' | 'body'>('title')
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { pushModal } = useModal()

  const handleSearch = () => {
    if (!keyword.trim()) {
      pushModal({
        component: (
          <Alert
            isOpen={true}
            message="검색어를 입력하세요"
            confirmLabel="확인"
          />
        ),
      })
      return
    }

    setIsSearching(true)
    onSearch(searchType, keyword)
  }

  const handleReset = () => {
    setKeyword('')
    setSearchType('title')
    setIsSearching(false)

    onSearch('' as 'title', '')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Group gap="sm">
      <Select
        w={120}
        data={[
          { value: 'title', label: '제목' },
          { value: 'body', label: '내용' },
        ]}
        value={searchType}
        onChange={(value) => setSearchType(value as 'title' | 'body')}
      />
      <TextInput
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.currentTarget.value)}
        onKeyPress={handleKeyPress}
        w={300}
      />
      <Button onClick={handleSearch}>검색</Button>
      {isSearching && (
        <Button variant="outline" onClick={handleReset}>
          검색취소
        </Button>
      )}
    </Group>
  )
}
