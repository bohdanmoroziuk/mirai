import { z } from 'zod'
import { emailSchema, passwordSchema } from './auth.schema'

export const loginUserBodySchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
