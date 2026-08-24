import type { CaseParams } from '../types/case-params.types'
import type { DeleteCaseInput } from '../types/delete-case.types'

export const toDeleteCaseInput = (userId: string, params: CaseParams): DeleteCaseInput => ({
  caseId: params.caseId,
  userId,
})
