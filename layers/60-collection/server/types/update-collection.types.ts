import type { z } from 'zod'
import type { updateCollectionBodySchema } from '../schemas/update-collection.schema'

export type UpdateCollectionBody = z.output<typeof updateCollectionBodySchema>

export type UpdateCollectionInput = {
  collectionId: string
  title: string
  userId: string
}
