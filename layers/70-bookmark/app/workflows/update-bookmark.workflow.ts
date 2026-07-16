import { useUpdateBookmarkMutation } from '../queries/bookmark.mutations'
import type { UpdateBookmarkInput } from '../types/bookmark'

export const useUpdateBookmarkWorkflow = () => {
  const notification = useNotification()
  const { isPending: isUpdating, mutateAsync } = useUpdateBookmarkMutation()

  const updateBookmark = async (input: UpdateBookmarkInput) => {
    if (toValue(isUpdating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Bookmark updated',
      })

      return true
    }
    catch (error) {
      notification.error({
        title: 'Operation failed',
        description: getErrorMessage(error),
      })

      return false
    }
  }

  return {
    isUpdating,
    updateBookmark,
  }
}
