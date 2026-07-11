import type { Tag } from '../../../../shared/types/tag'
import type { TagDocument } from '../types/tag.mongo.types'

export const toTag = (document: TagDocument): Tag => {
  return {
    id: document._id.toString(),
    userId: document.userId.toString(),
    name: document.name,
    color: document.color ?? undefined,
    updatedAt: document.updatedAt.toISOString(),
    createdAt: document.createdAt.toISOString(),
  }
}
