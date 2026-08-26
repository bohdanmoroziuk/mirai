import { z } from 'zod'

export const caseTitleSchema = z
  .string({ error: 'Title must be text' })
  .trim()
  .min(3, { error: 'Title must contain at least 3 characters' })
  .max(120, { error: 'Title must not exceed 120 characters' })

export const caseDescriptionSchema = z
  .string({ error: 'Description must be text' })
  .trim()
  .max(2_000, { error: 'Description must not exceed 2000 characters' })
