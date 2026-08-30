import type { CaseParams } from '../../types/case-params.types'
import type { GetCaseInput } from './getCase.types'

export const toGetCaseInput = (userId: string, params: CaseParams): GetCaseInput => ({
  caseId: params.caseId,
  userId,
})
