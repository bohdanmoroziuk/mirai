import { z } from 'zod'

export const collectionFormStateSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3)
    .max(120),
})
