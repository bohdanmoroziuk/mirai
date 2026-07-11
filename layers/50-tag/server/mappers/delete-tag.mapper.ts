import type { TagParams } from '../types/tag-params.types'
import type { DeleteTagInput } from '../types/delete-tag.types'

export const toDeleteTagInput = (
  userId: string,
  params: TagParams,
): DeleteTagInput => {
  return {
    userId,
    tagId: params.tagId,
  }
}
