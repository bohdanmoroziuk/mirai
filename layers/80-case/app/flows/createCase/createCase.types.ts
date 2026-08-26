import type { z } from 'zod'

export type CaseFormState = z.infer<typeof caseFormStateSchema>

export type CreateCaseInput = {
  body: {
    title: string
    description: string
  }
}
