import { useCreateTagMutation } from '../queries/tag.mutations'
import type { CreateTagInput } from '../types/tag'

export const useCreateTagWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateTagMutation()

  const createTag = async (input: CreateTagInput) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Tag created',
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
    createTag,
  }
}
