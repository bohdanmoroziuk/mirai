import type { z } from 'zod'
import type { createComponentArgsSchema } from './component.schema'

export type CreateComponentArgs = z.infer<typeof createComponentArgsSchema>

export type CreateComponentResult = {
  relativePath: string
}
