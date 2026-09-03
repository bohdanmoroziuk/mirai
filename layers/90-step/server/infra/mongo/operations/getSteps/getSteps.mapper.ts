import type { FindStepsQuery } from './getSteps.types'

export const toFindStepsQuery = (input: GetStepsInput): FindStepsQuery => ({
  filter: {
    userId: toObjectId(input.userId),
    caseId: toObjectId(input.caseId),
  },
  sort: {
    order: 1,
  },
})
