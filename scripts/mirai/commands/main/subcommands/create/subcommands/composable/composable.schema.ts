import { z } from 'zod'
import { layerNameSchema } from '#mirai/common/schemas/args.schema'

export const createComposableArgsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, {
      error: 'Composable name must be at least 5 characters long.',
    })
    .regex(/^use[A-Z][A-Za-z]*$/, {
      error: 'Composable name must start with "use" and use only letters, e.g. useNotification.',
    }),

  layer: layerNameSchema.optional(),
})
