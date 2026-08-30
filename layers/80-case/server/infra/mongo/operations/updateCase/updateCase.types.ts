import type { QueryOptions, Types, UpdateQuery } from 'mongoose'
import type { CaseFields } from '../../types/case.mongo.types'

export type UpdateCaseQuery = {
  filter: {
    _id: Types.ObjectId
    userId: Types.ObjectId
  }
  update: UpdateQuery<CaseFields>
  options: QueryOptions<CaseFields>
}
