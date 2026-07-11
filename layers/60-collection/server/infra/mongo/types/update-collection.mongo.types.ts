import type { QueryFilter, QueryOptions, UpdateQuery } from 'mongoose'
import type { CollectionFields } from './collection.mongo.types'

export type UpdateCollectionQuery = {
  filter: QueryFilter<CollectionFields>
  update: UpdateQuery<CollectionFields>
  options: QueryOptions<CollectionFields>
}
