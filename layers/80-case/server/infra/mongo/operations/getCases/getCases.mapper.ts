import type { GetCasesInput } from '../../../../flows/getCases/getCases.types'
import type { FindCasesQuery } from './getCases.types'

export const toFindCasesQuery = (input: GetCasesInput): FindCasesQuery => ({
  filter: { userId: toObjectId(input.userId) },
  sort: { createdAt: -1 },
})
