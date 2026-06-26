import type { CreateTagInput, DeleteTagOutput, GetTagsQuery } from '../types/tag'

export const tagRepository = {
  getMany(query: GetTagsQuery) {
    return $fetch <ApiResponse<Tag[]>>('/api/tags', {
      method: 'get',
      query,
    })
  },

  createOne(input: CreateTagInput) {
    return $fetch<ApiResponse<Tag>>('/api/tags', {
      method: 'post',
      body: input,
    })
  },

  deleteOne(tagId: string) {
    return $fetch <ApiResponse<DeleteTagOutput>>(`/api/tags/${tagId}`, {
      method: 'delete',
    })
  },
}
