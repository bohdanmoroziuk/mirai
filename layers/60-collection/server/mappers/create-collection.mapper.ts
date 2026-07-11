import type { CreateCollectionBody, CreateCollectionInput } from '../types/create-collection.types'

export const toCreateCollectionInput = (
  userId: string,
  body: CreateCollectionBody,
): CreateCollectionInput => {
  return {
    userId,
    title: body.title,
    parentId: body.parentId,
  }
}
