export const bookmarkRepository = {
  getMany() {
    return $fetch<ApiResponse<Bookmark[]>>('/api/bookmarks')
  },
}
