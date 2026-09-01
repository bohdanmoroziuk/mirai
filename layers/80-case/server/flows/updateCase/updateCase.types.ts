import type { z } from 'zod'
import type { updateCaseBodySchema } from './updateCase.schema'

export type UpdateCaseBody = z.infer<typeof updateCaseBodySchema>

export type UpdateCaseInput = UpdateCaseBody & {
  caseId: string
  userId: string
}
