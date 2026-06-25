import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { bookmarkRepository } from '../repositories/bookmark.repository'
import type { GetBookmarksQuery } from '../types/bookmark'

export const useBookmarkQuery = (
  query: MaybeRefOrGetter<GetBookmarksQuery> = {},
) => {
  const {
    data: bookmarks,
    isFetching,
    error,
  } = useQuery<
    ApiResponse<Bookmark[]>,
    Error,
    Bookmark[]
  >({
    queryKey: computed(() => {
      return [
        'bookmarks',
        toValue(query),
      ]
    }),
    queryFn: () => bookmarkRepository.getMany(toValue(query)),
    initialData: toApiResponse([]),
    initialDataUpdatedAt: 0,
    select: selectApiData,
  })

  return {
    bookmarks,
    isFetching,
    error,
  }
}

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending,
    mutateAsync: createBookmark,
  } = useMutation({
    mutationKey: ['bookmarks', 'create'],
    mutationFn: bookmarkRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bookmarks'],
      })
    },
  })

  return {
    isPending,
    createBookmark,
  }
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending,
    mutateAsync: deleteBookmark,
  } = useMutation({
    mutationKey: ['bookmarks', 'delete'],
    mutationFn: bookmarkRepository.deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['bookmarks'],
      })
    },
  })

  return {
    isPending,
    deleteBookmark,
  }
}
