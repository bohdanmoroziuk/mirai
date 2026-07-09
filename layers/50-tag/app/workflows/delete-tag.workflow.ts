import { useDeleteTagMutation } from '../queries/tag.mutations'
import { toDeleteTagInput } from '../mappers/tag-input.mapper'

export const useDeleteTagWorkflow = (tagId: MaybeRefOrGetter<string>) => {
  const notification = useNotification()
  const { confirm } = useConfirmModal()
  const { isPending, mutateAsync } = useDeleteTagMutation()

  const deleteTag = async () => {
    await confirm({
      title: 'Delete tag?',
      description: 'This tag will be permanently deleted.',
      confirmLabel: 'Delete',

      async onConfirm() {
        await mutateAsync(toDeleteTagInput(toValue(tagId)))

        notification.success({
          title: 'Tag has been deleted successfully',
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
    isPending,
    deleteTag,
  }
}
