import type { z } from 'zod'
import type { createLayerArgsSchema } from './layer.schema'

export type CreateLayerArgs = z.infer<typeof createLayerArgsSchema>

export type CreateLayerResult = {
  relativePath: string
}
