import { z } from 'zod'
import { Types } from 'mongoose'

export const objectIdSchema = z
  .string({ error: 'ID must be text' })
  .trim()
  .refine(Types.ObjectId.isValid, {
    error: 'ID must be a valid identifier',
  })
