import { useCreateCollectionMutation } from '../queries/collection.mutations'
import type { CreateCollectionInput } from '../types/collection'

export const useCreateCollectionWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateCollectionMutation()

  const createCollection = async (input: CreateCollectionInput) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(input)

      notification.success({
        title: 'Collection created',
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
    createCollection,
  }
}
