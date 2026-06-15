import { Schema } from 'mongoose'
import type { CollectionSchema } from '@collection/server/types/collection'
import { createMongooseModel } from '@shared/server/utils/mongoose'

const collectionSchema = new Schema<CollectionSchema>({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 120,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    default: null,
    index: true,
  },
}, {
  timestamps: true,
})

export const CollectionModel = createMongooseModel<CollectionSchema>('Collection', collectionSchema)
