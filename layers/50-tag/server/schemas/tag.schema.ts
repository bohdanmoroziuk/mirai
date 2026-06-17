import { z } from 'zod'

export const createTagBodySchema = z.object({
  name: z.string().trim().min(3).max(32),
  color: z.string().optional(),
})
