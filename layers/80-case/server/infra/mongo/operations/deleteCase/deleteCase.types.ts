import type { Types } from 'mongoose'

export type DeleteCaseQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
}
