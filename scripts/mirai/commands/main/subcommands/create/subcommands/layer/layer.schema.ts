import { z } from 'zod'
import { layerNameSchema } from '#mirai/common/schemas/args.schema'

export const createLayerArgsSchema = z.object({
  name: layerNameSchema,

  description: z
    .string()
    .trim()
    .optional(),
})
