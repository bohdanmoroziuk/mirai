import type { Collection } from '@collection/shared/types/collection'
import type { CollectionDocument } from '@collection/server/types/collection'

export const mapCollection = (document: CollectionDocument): Collection => {
  return {
    id: document._id.toString(),
    title: document.title,
    userId: document.userId.toString(),
    parentId: document.parentId?.toString() ?? null,
    updatedAt: document.updatedAt,
    createdAt: document.createdAt,
  }
}
