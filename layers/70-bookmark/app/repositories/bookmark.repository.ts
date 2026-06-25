import type { CreateBookmarkInput, GetBookmarksQuery } from '../types/bookmark'

export const bookmarkRepository = {
  getMany(query: GetBookmarksQuery = {}) {
    return $fetch<ApiResponse<Bookmark[]>>('/api/bookmarks', {
      method: 'get',
      query,
    })
  },

  createOne(input: CreateBookmarkInput) {
    return $fetch<ApiResponse<Bookmark>>('/api/bookmarks', {
      method: 'post',
      body: input,
    })
  },
}
