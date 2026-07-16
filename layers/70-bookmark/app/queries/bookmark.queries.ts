import { useQuery } from '@tanstack/vue-query'
import { getDetailParams, getListQuery } from '@common/app/utils/query-keys'
import { bookmarkRepository } from '../repositories/bookmark.repository'
import { bookmarkKeys } from './bookmark.keys'
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
      return bookmarkKeys.detail(getDetailParams(toValue(input)))
    }),
    queryFn: () => {
      return bookmarkRepository.getOne(toValue(input))
    },
    select: selectApiData,
  })
}

export const useBookmarksQuery = (
  input: MaybeRefOrGetter<GetBookmarksInput> = {},
) => {
  return useQuery<
    ApiResponse<Bookmark[]>,
    Error,
    Bookmark[]
  >({
    queryKey: computed(() => {
      return bookmarkKeys.list(getListQuery(toValue(input)))
    }),
    queryFn: () => {
      return bookmarkRepository.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
