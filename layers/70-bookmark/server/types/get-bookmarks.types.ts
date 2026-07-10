import type { z } from 'zod'
import type { getBookmarksQuerySchema } from '../schemas/get-bookmarks.schema'
import type { Bookmark } from '../../shared/types/bookmark'

export type GetBookmarksQuery = z.infer<typeof getBookmarksQuerySchema>

export type GetBookmarksInput = Pick<
  Bookmark,
  | 'userId'
  | 'collectionId'
>
