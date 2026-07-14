import { useQuery } from '@tanstack/vue-query'
import { bookmarkRepository } from '../repositories/bookmark.repository'
import type { GetBookmarkInput, GetBookmarksInput } from '../types/bookmark'

export const useBookmarkQuery = (
  input: MaybeRefOrGetter<GetBookmarkInput>,
) => {
  return useQuery<
    ApiResponse<Bookmark>,
    Error,
    Bookmark
  >({
    queryKey: computed(() => {
      return ['bookmarks', toValue(input)]
    }),
    queryFn: () => {
      return bookmarkRepository.getOne(toValue(input))
    },
    select: selectApiData,
  })
}

export const useBookmarksQuery = (
  input: MaybeRefOrGetter<GetBookmarksInput>,
) => {
  return useQuery<
    ApiResponse<Bookmark[]>,
    Error,
    Bookmark[]
  >({
    queryKey: computed(() => {
      return ['bookmarks', toValue(input)]
    }),
    queryFn: () => {
      return bookmarkRepository.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
