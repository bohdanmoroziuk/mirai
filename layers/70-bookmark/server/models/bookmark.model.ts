import { Schema } from 'mongoose'
import type { BookmarkSchema } from '../types/bookmark'

const bookmarkSchema = new Schema<BookmarkSchema>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  collectionId: {
    type: Schema.Types.ObjectId,
    ref: 'Collection',
    default: null,
    index: true,
  },
  tagIds: {
    type: [Schema.Types.ObjectId],
    ref: 'Tag',
    default: [],
  },
}, {
  timestamps: true,
})

bookmarkSchema.index({
  userId: 1,
  collectionId: 1,
})

bookmarkSchema.index({
  userId: 1,
  tagIds: 1,
})

export const BookmarkModel = createMongooseModel<BookmarkSchema>('Bookmark', bookmarkSchema)
