import type { QueryFilter } from 'mongoose'
import type { CollectionFields } from './collection.mongo.types'

export type DeleteCollectionQuery = {
  filter: QueryFilter<CollectionFields>
}
