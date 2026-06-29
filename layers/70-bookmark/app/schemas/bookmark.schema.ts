import { z } from 'zod'

export const bookmarkPayloadSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(3).or(z.literal('')),
  url: z.url(),
  isFavorite: z.boolean(),
  collectionId: z.string().optional(),
  tagIds: z.array(z.string()),
})
