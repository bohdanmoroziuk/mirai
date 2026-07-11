import { z } from 'zod'

export const updateTagBodySchema = z.object({
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(32)
    .optional(),

  color: z
    .string()
    .optional(),
})
