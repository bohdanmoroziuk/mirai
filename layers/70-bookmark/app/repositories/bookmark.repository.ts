import type { GetBookmarksInput, CreateBookmarkInput, DeleteBookmarkInput, DeleteBookmarkOutput } from '../types/bookmark'

export const bookmarkRepository = {
  getMany(input: GetBookmarksInput = {}) {
    return $fetch<ApiResponse<Bookmark[]>>('/api/bookmarks', {
      method: 'get',
      query: input.query,
    })
  },

  createOne(input: CreateBookmarkInput) {
    return $fetch<ApiResponse<Bookmark>>('/api/bookmarks', {
      method: 'post',
      body: input.body,
    })
  },

  deleteOne(input: DeleteBookmarkInput) {
    return $fetch <ApiResponse<DeleteBookmarkOutput>>(`/api/bookmarks/${input.params.bookmarkId}`, {
      method: 'delete',
    })
  },
}
