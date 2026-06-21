import type { HydratedDocument, Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'
import type { SuccessOutput } from '@core/shared/types/api'

export type CollectionSchema = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
  updatedAt: Date
  createdAt: Date
}

export type CollectionDocument = HydratedDocument<CollectionSchema>

export type CreateCollectionInput = {
  title: string
  userId: string
  parentId?: Nullish<string>
}

export type CreateCollectionDocumentInput = {
  title: string
  userId: Types.ObjectId
  parentId?: Nullish<Types.ObjectId>
}

export type GetCollectionsInput = {
  userId: string
}

export type FindCollectionDocumentsInput = {
  userId: Types.ObjectId
}

export type GetCollectionInput = {
  userId: string
  collectionId: string
}

export type FindCollectionDocumentInput = {
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}

export type UpdateCollectionInput = {
  title: string
  userId: string
  collectionId: string
}

export type UpdateCollectionDocumentInput = {
  title: string
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}

export type DeleteCollectionInput = {
  userId: string
  collectionId: string
}

export type DeleteCollectionOutput = SuccessOutput

export type DeleteCollectionDocumentInput = {
  userId: Types.ObjectId
  collectionId: Types.ObjectId
}
