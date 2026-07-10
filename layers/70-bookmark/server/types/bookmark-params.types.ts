import type z from 'zod'
import type { bookmarkParamsSchema } from '../schemas/bookmark-params.schema'

export type BookmarkParams = z.infer<typeof bookmarkParamsSchema>
