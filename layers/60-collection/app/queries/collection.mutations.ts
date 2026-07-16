import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { collectionKeys } from './collection.keys'
import { collectionRepository } from '../repositories/collection.repository'

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: collectionKeys.create,
    mutationFn: collectionRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: collectionKeys.lists,
      })
    },
  })
}
