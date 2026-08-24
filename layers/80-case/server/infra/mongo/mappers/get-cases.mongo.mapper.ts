import type { GetCasesInput } from '../../../types/get-cases.types'
import type { FindCasesQuery } from '../types/get-cases.mongo.types'

export const toFindCasesQuery = (input: GetCasesInput): FindCasesQuery => ({
  filter: { userId: toObjectId(input.userId) },
  sort: { createdAt: -1 },
})
