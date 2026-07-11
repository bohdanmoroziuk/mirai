import type { QueryFilter } from 'mongoose'
import type { TagFields } from './tag.mongo.types'

export type DeleteTagQuery = {
  filter: QueryFilter<TagFields>
}
