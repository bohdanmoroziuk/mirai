import type { z } from 'zod'
import type { caseFormStateSchema } from '../schemas/case.schema'

export type CaseFormState = z.infer<typeof caseFormStateSchema>
