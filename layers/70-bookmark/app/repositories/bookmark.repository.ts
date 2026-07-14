import type { GetBookmarkInput, GetBookmarksInput, CreateBookmarkInput, DeleteBookmarkInput, DeleteBookmarkOutput, UpdateBookmarkInput } from '../types/bookmark'

export const bookmarkRepository = {
  getOne(input: GetBookmarkInput) {
    return $fetch<ApiResponse<Bookmark>>(`/api/bookmarks/${input.params.bookmarkId}`, {
      method: 'get',
    })
  },

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

  updateOne(input: UpdateBookmarkInput) {
    return $fetch <ApiResponse<Bookmark>>(`/api/bookmarks/${input.params.bookmarkId}`, {
      method: 'patch',
      body: input.body,
    })
  },

  deleteOne(input: DeleteBookmarkInput) {
    return $fetch <ApiResponse<DeleteBookmarkOutput>>(`/api/bookmarks/${input.params.bookmarkId}`, {
      method: 'delete',
    })
  },
}
