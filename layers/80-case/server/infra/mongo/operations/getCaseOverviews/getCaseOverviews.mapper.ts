import { mapValueOr } from '@core/shared/utils/value'
import type { CaseOverview, GetCaseOverviewsInput } from '../../../../flows/getCaseOverviews'
import type { CaseDocument } from '../../types/case.mongo.types'
import type { FindCaseOverviewsQuery } from './getCaseOverviews.types'

export const toFindCaseOverviewsQuery = (
  input: GetCaseOverviewsInput,
): FindCaseOverviewsQuery => ({
  filter: { userId: toObjectId(input.userId) },
  sort: { createdAt: -1 },
})

export const toCaseOverview = (document: CaseDocument): CaseOverview => ({
  id: document._id.toString(),
  title: document.title,
  description: mapValueOr(document.description, value => value, undefined),
  userId: document.userId.toString(),
  createdAt: document.createdAt.toISOString(),
  updatedAt: document.updatedAt.toISOString(),
})
