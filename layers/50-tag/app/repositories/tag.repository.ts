import type { GetTagsInput, CreateTagInput, DeleteTagInput, DeleteTagOutput } from '../types/tag'

export const tagRepository = {
  getMany(input: GetTagsInput) {
    return $fetch <ApiResponse<Tag[]>>('/api/tags', {
      method: 'get',
      query: input.query,
    })
  },

  createOne(input: CreateTagInput) {
    return $fetch<ApiResponse<Tag>>('/api/tags', {
      method: 'post',
      body: input.body,
    })
  },

  deleteOne(input: DeleteTagInput) {
    return $fetch <ApiResponse<DeleteTagOutput>>(`/api/tags/${input.params.tagId}`, {
      method: 'delete',
    })
  },
}
