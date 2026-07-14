import { z } from 'zod'

export const tagFormStateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(32),

  color: z
    .string()
    .trim(),
})
