import { useDeleteTagMutation } from '../queries/tag.mutations'
import { toDeleteTagInput } from '../mappers/tag-input.mapper'

export const useDeleteTagWorkflow = () => {
  const notification = useNotification()
  const { isPending: isDeleting, mutateAsync } = useDeleteTagMutation()

  const deleteTag = async (tagId: string) => {
    if (toValue(isDeleting)) {
      return
    }

    try {
      await mutateAsync(toDeleteTagInput(tagId))

      notification.success({
        title: 'Tag deleted',
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
    deleteTag,
  }
}
