import { toDeleteBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useDeleteBookmarkMutation } from '../queries/bookmark.mutations'

export const useDeleteBookmarkWorkflow = (bookmarkId: MaybeRefOrGetter<string>) => {
  const notification = useNotification()
  const { confirm } = useConfirmModal()
  const { isPending: isDeleting, mutateAsync } = useDeleteBookmarkMutation()

  const deleteBookmark = async () => {
    if (toValue(isDeleting)) {
      return
    }

    await confirm({
      title: 'Delete bookmark?',
      description: 'This bookmark will be permanently deleted.',
      confirmLabel: 'Delete',

      async onConfirm() {
        await mutateAsync(toDeleteBookmarkInput(toValue(bookmarkId)))

        notification.success({
          title: 'Bookmark has been deleted successfully',
        })
      },

      onError(error) {
        notification.error({
          title: 'Operation failed!',
          description: getErrorMessage(error),
        })
      },
    })
  }

  return {
    isDeleting,
    deleteBookmark,
  }
}
