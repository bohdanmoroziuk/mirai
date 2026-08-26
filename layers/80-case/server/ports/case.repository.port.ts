import type { Nullable } from '@core/shared/types/common'
import type { Case, CaseStats } from '../../shared/types/case'
import type { CreateCaseInput } from '../types/create-case.types'
import type { GetCaseInput } from '../types/get-case.types'
import type { GetCasesInput } from '../types/get-cases.types'
import type { UpdateCaseInput } from '../types/update-case.types'
import type { DeleteCaseInput } from '../types/delete-case.types'

export interface CaseRepository {
  findOne(input: GetCaseInput): Promise<Nullable<Case>>
  findMany(input: GetCasesInput): Promise<Case[]>
  createOne(input: CreateCaseInput): Promise<Case>
  updateOne(input: UpdateCaseInput): Promise<Nullable<Case>>
  deleteOne(input: DeleteCaseInput): Promise<Nullable<Case>>
  getStats(input: GetCaseStatsInput): Promise<CaseStats>
}
