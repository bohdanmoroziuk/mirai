import type { GetCaseInput } from '../../../types/get-case.types'
import type { FindCaseQuery } from '../types/get-case.mongo.types'

export const toFindCaseQuery = (input: GetCaseInput): FindCaseQuery => ({
  filter: {
    _id: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
  },
})
