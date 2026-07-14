import type { z } from 'zod'
import type { collectionFormStateSchema } from '../schemas/collection.schema'

export type CollectionFormState = z.infer<typeof collectionFormStateSchema>

export type CollectionPayload = CollectionFormState

export type CreateCollectionInput = {
  body: CollectionPayload
}
