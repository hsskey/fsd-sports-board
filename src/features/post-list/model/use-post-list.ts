import { usePostList as useEntityPostList } from '@/entities/post/model/queries'
import { useState } from 'react'

export function usePostList(boardType: 'golf' | 'soccer') {
  const [searchState, setSearchState] = useState({
    currentPage: 1,
    searchParams: {
      searchType: '' as 'title' | 'body' | '',
      keyword: '',
    },
  })

  const { data, isLoading } = useEntityPostList(boardType, {
    page: searchState.currentPage,
    perPage: 10,
    ...searchState.searchParams,
  })

  const handleSearch = (searchType: 'title' | 'body', keyword: string) => {
    setSearchState((prev) => ({
      ...prev,
      currentPage: 1,
      searchParams: { searchType, keyword },
    }))
  }

  return {
    posts: data?.posts,
    totalCount: data?.totalCount ?? 0,
    isLoading,
    searchState,
    setSearchState,
    handleSearch,
  }
}
