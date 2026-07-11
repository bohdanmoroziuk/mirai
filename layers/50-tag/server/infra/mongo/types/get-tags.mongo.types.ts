import type { QueryFilter } from 'mongoose'
import type { QuerySort } from '@common/server/types/mongoose'
import type { TagFields } from './tag.mongo.types'

export type FindTagsQuery = {
  filter: QueryFilter<TagFields>
  sort: QuerySort<TagFields>
}
