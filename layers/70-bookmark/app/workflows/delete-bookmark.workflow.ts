import { toDeleteBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useDeleteBookmarkMutation } from '../queries/bookmark.mutations'

export const useDeleteBookmarkWorkflow = () => {
  const notification = useNotification()
  const { isPending: isDeleting, mutateAsync } = useDeleteBookmarkMutation()

  const deleteBookmark = async (bookmarkId: string) => {
    if (toValue(isDeleting)) {
      return
    }

    try {
      await mutateAsync(toDeleteBookmarkInput(bookmarkId))

      notification.success({
        title: 'Bookmark deleted',
      })
    }
    catch (error) {
      notification.error({
        title: 'Operation failed',
        description: getErrorMessage(error),
      })
    }
  }

  return {
    isDeleting,
    deleteBookmark,
  }
}
