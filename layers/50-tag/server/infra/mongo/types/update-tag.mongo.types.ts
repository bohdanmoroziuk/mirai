import type { QueryFilter, QueryOptions, UpdateQuery } from 'mongoose'
import type { TagFields } from './tag.mongo.types'

export type UpdateTagQuery = {
  filter: QueryFilter<TagFields>
  update: UpdateQuery<TagFields>
  options: QueryOptions<TagFields>
}
