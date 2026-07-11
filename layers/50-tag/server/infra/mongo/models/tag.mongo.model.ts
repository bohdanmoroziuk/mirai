import { Schema } from 'mongoose'
import type { TagFields } from '../types/tag.mongo.types'

const tagSchema = new Schema<TagFields>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
})

tagSchema.index({
  userId: 1,
  name: 1,
}, {
  unique: true,
})

export const TagModel = createMongooseModel<TagFields>('Tag', tagSchema)
