import { toCreateBookmarkInput } from '../mappers/bookmark-input.mapper'
import { getBookmarkFormInitialState } from '../mappers/bookmark.mapper'
import { useCreateBookmarkMutation } from '../queries/bookmark.mutations'
import type { BookmarkFormState } from '../types/bookmark'

export const useCreateBookmarkWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateBookmarkMutation()
  const bookmarkFormInitialState = getBookmarkFormInitialState()

  const createBookmark = async (state: BookmarkFormState) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(toCreateBookmarkInput(state))

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
    bookmarkFormInitialState,
    isCreating,
    createBookmark,
  }
}
