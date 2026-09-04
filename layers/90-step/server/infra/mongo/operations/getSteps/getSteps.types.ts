import type { SortOrder, Types } from 'mongoose'

export type FindStepsQuery = {
  filter: {
    userId: Types.ObjectId
    caseId: Types.ObjectId
  }
  sort: {
    order: SortOrder
  }
}
