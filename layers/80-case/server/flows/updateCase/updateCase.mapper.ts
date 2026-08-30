import type { CaseParams } from '../../types/case-params.types'
import type { UpdateCaseBody, UpdateCaseInput } from './updateCase.types'

export const toUpdateCaseInput = (
  userId: string,
  params: CaseParams,
  body: UpdateCaseBody,
): UpdateCaseInput => ({
  title: body.title,
  description: body.description,
  caseId: params.caseId,
  userId,
})
