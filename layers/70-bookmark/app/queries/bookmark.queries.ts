import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { bookmarkRepository } from '../repositories/bookmark.repository'
import type { GetBookmarksQuery } from '../types/bookmark'
import { toGetBookmarksInput } from '../mappers/bookmark-input.mapper'

export const useBookmarkQuery = (
  query: MaybeRefOrGetter<GetBookmarksQuery> = {},
) => {
  const input = computed(() => {
    return toGetBookmarksInput(toValue(query))
  })

  const {
    data: bookmarks,
    isFetching: loading,
    error,
  } = useQuery<
    ApiResponse<Bookmark[]>,
    Error,
    Bookmark[]
  >({
    queryKey: computed(() => {
      return [
        'bookmarks',
        toValue(input),
      ]
    }),
    queryFn: () => bookmarkRepository.getMany(toValue(input)),
    initialData: toApiResponse([]),
    initialDataUpdatedAt: 0,
    select: selectApiData,
  })

  return {
    bookmarks,
    loading,
    error,
  }
}

export const useCreateBookmarkMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending: loading,
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
    loading,
    createBookmark,
  }
}

export const useDeleteBookmarkMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending: loading,
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
    loading,
    deleteBookmark,
  }
}
