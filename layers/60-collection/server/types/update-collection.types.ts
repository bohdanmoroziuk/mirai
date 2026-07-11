import type { z } from 'zod'
import type { CollectionParams } from './collection-params.types'
import type { updateCollectionBodySchema } from '../schemas/update-collection.schema'

export type UpdateCollectionBody = z.output<typeof updateCollectionBodySchema>

export type UpdateCollectionInput = CollectionParams & {
  title: string
  userId: string
}
