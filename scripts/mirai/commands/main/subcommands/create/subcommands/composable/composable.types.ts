import type { z } from 'zod'
import type { createComposableArgsSchema } from './composable.schema'

export type CreateComposableArgs = z.infer<typeof createComposableArgsSchema>

export type CreateComposableResult = {
  relativePath: string
}
