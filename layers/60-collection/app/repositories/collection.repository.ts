import type { CreateCollectionInput } from '@collection/app/types/collection'

export const collectionRepository = {
  getMany() {
    return $fetch<ApiResponse<Collection[]>>('/api/collections')
  },

  createOne(input: CreateCollectionInput) {
    return $fetch<ApiResponse<Collection>>('/api/collections', {
      method: 'post',
      body: input.body,
    })
  },
}
