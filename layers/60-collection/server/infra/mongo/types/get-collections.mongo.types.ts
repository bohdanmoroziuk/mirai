import type { QueryFilter } from 'mongoose'
import type { QuerySort } from '@common/server/types/mongoose'
import type { CollectionFields } from './collection.mongo.types'

export type FindCollectionsQuery = {
  filter: QueryFilter<CollectionFields>
  sort: QuerySort<CollectionFields>
}
