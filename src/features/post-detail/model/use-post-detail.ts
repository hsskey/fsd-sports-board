import { usePostDetail as useEntityPostDetail } from '@/entities/post/model/queries'
import { usePostDelete } from '@/features/post-delete/model/use-post-delete'
import { usePostEdit } from '@/features/post-edit/model/use-post-edit'

export function usePostDetail(boardType: 'golf' | 'soccer', postId: number) {
  const { data: post, isLoading } = useEntityPostDetail(boardType, postId)
  const { isDeleting, handleDelete } = usePostDelete(boardType)
  const { isEditing, handleEdit } = usePostEdit(boardType)

  return {
    post,
    isLoading,
    isDeleting,
    isEditing,
    handleDelete,
    handleEdit,
  }
}
