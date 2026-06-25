import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { bookmarkRepository } from '../repositories/bookmark.repository'

export const useBookmarkQuery = () => {
  const {
    data: bookmarks,
    isFetching,
    error,
  } = useQuery<
    ApiResponse<Bookmark[]>,
    Error,
    Bookmark[]
  >({
    queryKey: ['bookmarks'],
    queryFn: () => bookmarkRepository.getMany(),
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
