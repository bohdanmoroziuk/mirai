import type { z } from 'zod'
import type { tagParamsSchema } from '../schemas/tag-params.schema'

export type TagParams = z.infer<typeof tagParamsSchema>
