import type { SortOrder, Types } from 'mongoose'

export type FindCasesQuery = {
  filter: { userId: Types.ObjectId }
  sort: { createdAt: SortOrder }
}
