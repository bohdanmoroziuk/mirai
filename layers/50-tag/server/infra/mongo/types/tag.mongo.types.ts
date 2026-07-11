import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'

export type TagFields = {
  userId: Types.ObjectId
  name: string
  color: Nullish<string>
  updatedAt: Date
  createdAt: Date
}

export type TagDocument = HydratedDocument<TagFields>
