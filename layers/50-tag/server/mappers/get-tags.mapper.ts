import type { GetTagsInput, GetTagsQuery } from '../types/get-tags.types'

export const toGetTagsInput = (
  userId: string,
  query: GetTagsQuery,
): GetTagsInput => {
  return {
    userId,
    search: query.search,
  }
}
