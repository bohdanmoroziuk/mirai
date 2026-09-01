import type { Nullable } from '@core/shared/types/common'
import type { Case, CaseStats } from '../../shared/types/case'
import type { CreateCaseInput } from '../flows/createCase'
import type { DeleteCaseInput } from '../flows/deleteCase'
import type { GetCaseInput } from '../flows/getCase'
import type { CaseOverview, GetCaseOverviewsInput } from '../flows/getCaseOverviews'
import type { GetCaseStatsInput } from '../flows/getCaseStats'
import type { GetCasesInput } from '../flows/getCases'
import type { UpdateCaseInput } from '../flows/updateCase'

export interface CaseRepository {
  findOne(input: GetCaseInput): Promise<Nullable<Case>>
  findMany(input: GetCasesInput): Promise<Case[]>
  findOverviews(input: GetCaseOverviewsInput): Promise<CaseOverview[]>
  createOne(input: CreateCaseInput): Promise<Case>
  updateOne(input: UpdateCaseInput): Promise<Nullable<Case>>
  deleteOne(input: DeleteCaseInput): Promise<Nullable<Case>>
  getStats(input: GetCaseStatsInput): Promise<CaseStats>
}
