import { z } from 'zod'

export const collectionTitleSchema = z
  .string()
  .trim()
  .min(3)
  .max(120)
