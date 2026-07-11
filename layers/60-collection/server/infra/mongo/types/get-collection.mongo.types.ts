import type { QueryFilter } from 'mongoose'
import type { CollectionFields } from './collection.mongo.types'

export type FindCollectionQuery = {
  filter: QueryFilter<CollectionFields>
}
