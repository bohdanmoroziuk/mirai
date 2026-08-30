import type { GetCaseInput } from '../../../../flows/getCase/getCase.types'
import type { FindCaseQuery } from './getCase.types'

export const toFindCaseQuery = (input: GetCaseInput): FindCaseQuery => ({
  filter: {
    _id: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
  },
})
