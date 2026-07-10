import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { collectionRepository } from '../repositories/collection.repository'

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['collections', 'create'],
    mutationFn: collectionRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['collections'],
      })
    },
  })
}
