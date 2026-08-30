import type { Nullable } from '@core/shared/types/common'
import type { Case, CaseStats } from '../../shared/types/case'
import type { CreateCaseInput } from '../types/create-case.types'
import type { GetCaseInput } from '../flows/getCase/getCase.types'
import type { GetCasesInput } from '../flows/getCases/getCases.types'
import type { CaseOverview, GetCaseOverviewsInput } from '../flows/getCaseOverviews/getCaseOverviews.types'
import type { UpdateCaseInput } from '../flows/updateCase/updateCase.types'
import type { DeleteCaseInput } from '../flows/deleteCase/deleteCase.types'

export interface CaseRepository {
  findOne(input: GetCaseInput): Promise<Nullable<Case>>
  findMany(input: GetCasesInput): Promise<Case[]>
  findOverviews(input: GetCaseOverviewsInput): Promise<CaseOverview[]>
  createOne(input: CreateCaseInput): Promise<Case>
  updateOne(input: UpdateCaseInput): Promise<Nullable<Case>>
  deleteOne(input: DeleteCaseInput): Promise<Nullable<Case>>
  getStats(input: GetCaseStatsInput): Promise<CaseStats>
}
