import type { Types } from 'mongoose'

export type FindCaseQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
}
