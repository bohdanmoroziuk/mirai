import type { z } from 'zod'
import type { getBookmarksQuerySchema } from '../schemas/get-bookmarks.schema'

export type GetBookmarksQuery = z.infer<typeof getBookmarksQuerySchema>

export type GetBookmarksInput = {
  userId: string
  collectionId?: string
}
