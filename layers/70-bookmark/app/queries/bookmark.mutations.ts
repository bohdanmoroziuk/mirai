import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { bookmarkRepository } from '../repositories/bookmark.repository'

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['bookmarks', 'create'],
    mutationFn: bookmarkRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bookmarks'],
      })
    },
  })
}

export const useUpdateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['bookmarks', 'update'],
    mutationFn: bookmarkRepository.updateOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bookmarks'],
      })
    },
  })
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['bookmarks', 'delete'],
    mutationFn: bookmarkRepository.deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bookmarks'],
      })
    },
  })
}
