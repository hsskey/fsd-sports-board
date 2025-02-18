import { useUpdatePost } from '@/entities/post/model/mutations'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function usePostEdit(boardType: 'golf' | 'soccer') {
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  const updatePostMutation = useUpdatePost(boardType)

  const handleEdit = async (
    postId: number,
    boardName: string | undefined,
    title: string,
    content: string
  ) => {
    if (!boardName) {
      console.error('Board name is undefined')
      return
    }

    try {
      setIsEditing(true)
      await updatePostMutation.mutateAsync({ postId, title, content })
      navigate(`/${boardName}`, { replace: true })
    } catch (error) {
      console.error('Failed to update post:', error)
    } finally {
      setIsEditing(false)
    }
  }

  return {
    isEditing,
    handleEdit,
  }
}
