import type { z } from 'zod'

export type GetCasesInput = z.infer<typeof getCasesInputSchema>
