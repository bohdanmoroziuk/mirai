import { toCreateCollectionInput } from '../mappers/collection-input.mapper'
import { getCollectionFormInitialState } from '../mappers/collection.mapper'
import { useCreateCollectionMutation } from '../queries/collection.mutations'
import type { CollectionFormState } from '../types/collection'

export const useCreateCollectionWorkflow = () => {
  const notification = useNotification()
  const { isPending: isCreating, mutateAsync } = useCreateCollectionMutation()
  const collectionFormInitialState = getCollectionFormInitialState()

  const createCollection = async (state: CollectionFormState) => {
    if (toValue(isCreating)) {
      return false
    }

    try {
      await mutateAsync(toCreateCollectionInput(state))

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
    collectionFormInitialState,
    isCreating,
    createCollection,
  }
}
