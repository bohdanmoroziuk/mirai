import { compactObject } from '@core/shared/utils/object'
import type { UpdateCaseInput } from '../../../../flows/updateCase'
import type { UpdateCaseQuery } from './updateCase.types'

export const toUpdateCaseQuery = (input: UpdateCaseInput): UpdateCaseQuery => ({
  filter: {
    _id: toObjectId(input.caseId),
    userId: toObjectId(input.userId),
  },
  update: {
    $set: compactObject({
      title: input.title,
      description: input.description,
    }),
  },
  options: {
    runValidators: true,
    returnDocument: 'after',
  },
})
