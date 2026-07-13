import { useCreateBookmarkMutation } from '../queries/bookmark.mutations'
import type { CreateBookmarkInput } from '../types/bookmark'

export const useCreateBookmarkWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateBookmarkMutation()

  const createBookmark = async (input: CreateBookmarkInput) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Bookmark created',
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
    isCreating,
    createBookmark,
  }
}
