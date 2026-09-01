import type { z } from 'zod'
import type { caseParamsSchema } from '../schemas/case-params.schema'

export type CaseParams = z.infer<typeof caseParamsSchema>
