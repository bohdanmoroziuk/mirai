import type { Types } from 'mongoose'

export type FindBookmarkQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
}
