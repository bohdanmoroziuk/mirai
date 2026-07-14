import type { z } from 'zod'
import type { Nullable } from '@core/shared/types/common'
import type { createBookmarkBodySchema } from '../schemas/create-bookmark.schema'

export type CreateBookmarkBody = z.infer<typeof createBookmarkBodySchema>

export type CreateBookmarkInput = {
  title: string
  description: string
  url: string
  isFavorite: boolean
  userId: string
  collectionId: Nullable<string>
  tagIds: string[]
}
