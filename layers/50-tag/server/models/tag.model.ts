import { Schema } from 'mongoose'
import type { TagSchema } from '@tag/server/types/tag'

const tagSchema = new Schema<TagSchema>({
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
    default: null,
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

export const TagModel = createMongooseModel<TagSchema>('Tag', tagSchema)
