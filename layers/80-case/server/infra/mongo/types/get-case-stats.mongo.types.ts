import type { Types } from 'mongoose'

export type GetCaseStatsQuery = {
  filter: {
    userId: Types.ObjectId
  }
}
