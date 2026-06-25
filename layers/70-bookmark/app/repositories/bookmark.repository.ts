import type { CreateBookmarkInput } from '../types/bookmark'

export const bookmarkRepository = {
  getMany() {
    return $fetch<ApiResponse<Bookmark[]>>('/api/bookmarks')
  },

  createOne(input: CreateBookmarkInput) {
    return $fetch<ApiResponse<Bookmark>>('/api/bookmarks', {
      method: 'post',
      body: input,
    })
  },
}
