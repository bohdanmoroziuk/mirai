import { z } from 'zod'

export const searchSchema = z
  .string()
  .trim()
  .optional()

export const offsetSchema = z
  .coerce
  .number()
  .int()
  .min(0)
  .default(0)

export const limitSchema = z
  .coerce
  .number()
  .int()
  .min(1)
  .max(100)
  .default(20)
