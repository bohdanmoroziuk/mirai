import { z } from 'zod'

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email()

export const passwordSchema = z
  .string()
  .min(8)
  .max(24)
