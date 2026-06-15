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
  collectionId: Types.ObjectId
  userId: Types.ObjectId
}

export type GetCollectionInput = {
  collectionId: string
  userId: string
}

export type DeleteOneCollectionInput = {
  collectionId: Types.ObjectId
  userId: Types.ObjectId
}

export type DeleteCollectionInput = {
  collectionId: string
  userId: string
}

export type DeleteCollectionOutput = SuccessOutput
