import { z } from 'zod'
import { Types } from 'mongoose'

export const objectIdSchema = z
  .string()
  .trim()
  .refine(Types.ObjectId.isValid, {
    error: 'Invalid ObjectId',
  })
