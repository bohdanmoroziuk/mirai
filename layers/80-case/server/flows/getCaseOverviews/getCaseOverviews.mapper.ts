import type { GetCaseOverviewsInput } from './getCaseOverviews.types'

export const toGetCaseOverviewsInput = (userId: string): GetCaseOverviewsInput => ({ userId })
