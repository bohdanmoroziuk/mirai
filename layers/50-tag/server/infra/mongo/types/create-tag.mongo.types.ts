import type { Types } from 'mongoose'
import type { TagFields } from './tag.mongo.types'

export type CreateTagData = Omit<
  TagFields,
  | 'userId'
  | 'updatedAt'
  | 'createdAt'
> & {
  userId: Types.ObjectId
}
