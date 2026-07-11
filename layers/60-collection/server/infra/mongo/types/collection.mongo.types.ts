import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'

export type CollectionFields = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
  updatedAt: Date
  createdAt: Date
}

export type CollectionDocument = HydratedDocument<CollectionFields>
