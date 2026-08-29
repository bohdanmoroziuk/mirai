import type { SuccessOutput } from '@core/shared/types/api'

export type DeleteCaseInput = {
  caseId: string
  userId: string
}

export type DeleteCaseOutput = SuccessOutput
