import { useState } from 'react'

export function usePostEditForm() {
  const [isEditing, setIsEditing] = useState(false)

  const startEditing = () => setIsEditing(true)
  const stopEditing = () => setIsEditing(false)

  return {
    isEditing,
    startEditing,
    stopEditing,
  }
}
