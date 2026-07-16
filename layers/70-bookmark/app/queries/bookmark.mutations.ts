import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookmarkKeys } from './bookmark.keys'
import { bookmarkRepository } from '../repositories/bookmark.repository'

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: bookmarkKeys.create(),
    mutationFn: bookmarkRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.lists(),
      })
    },
  })
}

export const useUpdateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: bookmarkKeys.update(),
    mutationFn: bookmarkRepository.updateOne,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.detail(variables.params),
      })

      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.lists(),
      })
    },
  })
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: bookmarkKeys.delete(),
    mutationFn: bookmarkRepository.deleteOne,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: bookmarkKeys.lists(),
      })

      queryClient.removeQueries({
        queryKey: bookmarkKeys.detail(variables.params),
      })
    },
  })
}
