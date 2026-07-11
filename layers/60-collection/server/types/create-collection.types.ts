import type { z } from 'zod'
import type { Nullish } from '@core/shared/types/common'
import type { createCollectionBodySchema } from '../schemas/create-collection.schema'

export type CreateCollectionBody = z.output<typeof createCollectionBodySchema>

export type CreateCollectionInput = {
  title: string
  userId: string
  parentId?: Nullish<string>
}
