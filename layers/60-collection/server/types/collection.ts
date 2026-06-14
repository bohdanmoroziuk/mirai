import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { Timestamps } from '@core/shared/types/entity'

export type CollectionRecord = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
}

export type CollectionSchema = CollectionRecord & Timestamps

export type CollectionDocument = HydratedDocument<CollectionSchema>

export type CreateCollectionRecordInput = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
}

export type CreateCollectionInput = {
  title: string
  userId: string
  parentId?: Nullish<string>
}
