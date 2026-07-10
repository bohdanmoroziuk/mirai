import type { z } from 'zod'
import type { Bookmark } from '../../shared/types/bookmark'
import type { createBookmarkBodySchema } from '../schemas/create-bookmark.schema'

export type CreateBookmarkBody = z.infer<typeof createBookmarkBodySchema>

export type CreateBookmarkInput = Pick<
  Bookmark,
  | 'title'
  | 'description'
  | 'url'
  | 'isFavorite'
  | 'userId'
  | 'collectionId'
  | 'tagIds'
>
