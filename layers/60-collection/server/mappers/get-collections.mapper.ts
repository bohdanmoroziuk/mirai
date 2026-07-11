import type { GetCollectionsInput } from '../types/get-collections.types'

export const toGetCollectionsInput = (userId: string): GetCollectionsInput => {
  return {
    userId,
  }
}
