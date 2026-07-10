import type { z } from 'zod'
import type { Nullish } from '@core/shared/types/common'
import type { updateBookmarkBodySchema } from '../schemas/update-bookmark.schema'

export type UpdateBookmarkBody = z.infer<typeof updateBookmarkBodySchema>

export type UpdateBookmarkInput = {
  bookmarkId: string
  title?: string
  description?: string
  url?: string
  isFavorite?: boolean
  userId: string
  collectionId?: Nullish<string>
  tagIds?: string[]
}
