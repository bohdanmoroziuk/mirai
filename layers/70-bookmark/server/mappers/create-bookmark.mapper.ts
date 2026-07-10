import type { CreateBookmarkInput, CreateBookmarkBody } from '../types/create-bookmark.types'

export const toCreateBookmarkInput = (
  userId: string,
  body: CreateBookmarkBody,
): CreateBookmarkInput => {
  return {
    title: body.title,
    description: body.description,
    url: body.url,
    isFavorite: body.isFavorite,
    userId,
    collectionId: body.collectionId,
    tagIds: body.tagIds,
  }
}
