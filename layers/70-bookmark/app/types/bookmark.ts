export type GetBookmarksQuery = {
  collectionId?: string
}

export type CreateBookmarkInput = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  collectionId: Nullish<string>
  tagIds: string[]
}

export type CreateBookmarkFormState = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  collectionId: Nullish<string>
  tagIds: string[]
}
