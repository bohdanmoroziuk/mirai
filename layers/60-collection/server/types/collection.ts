import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { SuccessOutput } from '@core/shared/types/api'
import type { Timestamps } from '@core/shared/types/entity'

export type CollectionRecord = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
}

export type CollectionSchema = CollectionRecord & Timestamps

export type CollectionDocument = HydratedDocument<CollectionSchema>

export type CreateOneCollectionInput = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
}

export type CreateCollectionInput = {
  title: string
  userId: string
  parentId?: Nullish<string>
}

export type FindManyCollectionsInput = {
  userId: Types.ObjectId
}

export type FindOneCollectionInput = {
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}

export type GetCollectionInput = {
  userId: string
  collectionId: string
}

export type UpdateOneCollectionInput = {
  title: string
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}

export type UpdateCollectionInput = {
  title: string
  userId: string
  collectionId: string
}

export type DeleteOneCollectionInput = {
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}

export type DeleteCollectionInput = {
  userId: string
  collectionId: string
}

export type DeleteCollectionOutput = SuccessOutput
