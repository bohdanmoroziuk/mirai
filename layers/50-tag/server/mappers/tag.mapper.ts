import type { TagDocument } from '@tag/server/types/tag'

export const mapTag = (document: TagDocument): Tag => {
  return {
    id: document._id.toString(),
    userId: document.userId.toString(),
    name: document.name,
    color: document.color,
    updatedAt: document.updatedAt,
    createdAt: document.createdAt,
  }
}
