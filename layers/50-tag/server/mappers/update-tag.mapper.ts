import type { TagParams } from '../types/tag-params.types'
import type { UpdateTagBody, UpdateTagInput } from '../types/update-tag.types'

export const toUpdateTagInput = (
  userId: string,
  params: TagParams,
  body: UpdateTagBody,
): UpdateTagInput => {
  return {
    userId,
    tagId: params.tagId,
    name: body.name,
    color: body.color,
  }
}
