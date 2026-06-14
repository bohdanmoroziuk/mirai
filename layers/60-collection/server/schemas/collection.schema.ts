import { z } from 'zod'

export const createCollectionBodySchema = z.object({
  title: z.string().trim().min(3).max(120),
  parentId: z.string().optional(),
})
