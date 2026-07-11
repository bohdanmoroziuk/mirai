import type { Collection } from '../../../../shared/types/collection'
import type { CollectionDocument } from '../types/collection.mongo.types'

export const toCollection = (document: CollectionDocument): Collection => {
  return {
    id: document._id.toString(),
    title: document.title,
    userId: document.userId.toString(),
    parentId: document.parentId?.toString() ?? null,
    updatedAt: document.updatedAt.toISOString(),
    createdAt: document.createdAt.toISOString(),
  }
}
