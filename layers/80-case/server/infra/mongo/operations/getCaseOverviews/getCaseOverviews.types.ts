import type { SortOrder, Types } from 'mongoose'

export type FindCaseOverviewsQuery = {
  filter: { userId: Types.ObjectId }
  sort: { createdAt: SortOrder }
}
