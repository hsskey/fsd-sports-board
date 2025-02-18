import { useDeletePost } from '@/entities/post/model/mutations'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function usePostDelete(boardType: 'golf' | 'soccer') {
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()
  const deletePostMutation = useDeletePost(boardType)

  const handleDelete = async (
    postId: number,
    boardName: string | undefined
  ) => {
    if (!boardName) {
      console.error('Board name is undefined')
      return
    }

    try {
      setIsDeleting(true)
      await deletePostMutation.mutateAsync(postId)
      navigate(`/${boardName}`, { replace: true })
    } catch (error) {
      console.error('Failed to delete post:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isDeleting,
    handleDelete,
  }
}
