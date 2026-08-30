import type { DeleteCaseInput } from '../../../../flows/deleteCase'
import type { DeleteCaseQuery } from './deleteCase.types'

export const toDeleteCaseQuery = (input: DeleteCaseInput): DeleteCaseQuery => ({
  filter: {
    _id: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
  },
})
