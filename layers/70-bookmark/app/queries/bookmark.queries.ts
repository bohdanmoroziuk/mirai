import { useQuery } from '@tanstack/vue-query'
import { bookmarkKeys } from './bookmark.keys'
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
      return bookmarkKeys.detail(toValue(input).params)
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
      return bookmarkKeys.list(toValue(input).query)
    }),
    queryFn: () => {
      return bookmarkRepository.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
