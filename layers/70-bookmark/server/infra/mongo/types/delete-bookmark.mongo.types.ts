import type { Types } from 'mongoose'

export type DeleteBookmarkQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
}
