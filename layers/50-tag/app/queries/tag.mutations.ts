import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { tagRepository } from '../repositories/tag.repository'

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tags', 'create'],
    mutationFn: tagRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tags'],
      })
    },
  })
}

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tags', 'delete'],
    mutationFn: tagRepository.deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tags'],
      })
    },
  })
}
