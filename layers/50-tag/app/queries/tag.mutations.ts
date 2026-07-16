import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { tagKeys } from './tag.keys'
import { tagRepository } from '../repositories/tag.repository'

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: tagKeys.create,
    mutationFn: tagRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tagKeys.lists,
      })
    },
  })
}

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: tagKeys.delete,
    mutationFn: tagRepository.deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: tagKeys.lists,
      })
    },
  })
}
