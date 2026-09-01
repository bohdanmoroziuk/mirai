import { z } from 'zod'

export const searchSchema = z
  .string({ error: 'Search query must be text' })
  .trim()
  .optional()

export const offsetSchema = z
  .coerce
  .number({ error: 'Offset must be a number' })
  .int({ error: 'Offset must be an integer' })
  .min(0, { error: 'Offset must be zero or greater' })
  .default(0)

export const limitSchema = z
  .coerce
  .number({ error: 'Limit must be a number' })
  .int({ error: 'Limit must be an integer' })
  .min(1, { error: 'Limit must be at least 1' })
  .max(100, { error: 'Limit must not exceed 100' })
  .default(20)
