import type { DeleteCaseInput } from '../../../types/delete-case.types'
import type { DeleteCaseQuery } from '../types/delete-case.mongo.types'

export const toDeleteCaseQuery = (input: DeleteCaseInput): DeleteCaseQuery => ({
  filter: {
    _id: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
  },
})
