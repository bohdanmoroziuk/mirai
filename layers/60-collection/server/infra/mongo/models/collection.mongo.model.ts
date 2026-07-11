import { Schema } from 'mongoose'
import type { CollectionFields } from '../types/collection.mongo.types'

const collectionSchema = new Schema<CollectionFields>({
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

collectionSchema.index(
  {
    userId: 1,
    parentId: 1,
    title: 1,
  },
  {
    unique: true,
  },
)

export const CollectionModel = createMongooseModel<CollectionFields>('Collection', collectionSchema)
