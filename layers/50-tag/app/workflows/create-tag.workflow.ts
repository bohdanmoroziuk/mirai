import { useCreateTagMutation } from '../queries/tag.mutations'
import { getTagFormInitialState } from '../mappers/tag.mapper'
import { toCreateTagInput } from '../mappers/tag-input.mapper'
import type { TagFormState } from '../types/tag'

export const useCreateTagWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateTagMutation()
  const tagFormInitialState = getTagFormInitialState()

  const createTag = async (state: TagFormState) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(toCreateTagInput(state))

      notification.success({
        title: 'Tag has been created',
      })

      return true
    }
    catch (error) {
      notification.error({
        title: 'Operation failed!',
        description: getErrorMessage(error),
      })

      return false
    }
  }

  return {
    tagFormInitialState,
    isCreating,
    createTag,
  }
}
