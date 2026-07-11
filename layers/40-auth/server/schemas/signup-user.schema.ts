import { z } from 'zod'
import { emailSchema, passwordSchema } from './auth.schema'

export const signupUserBodySchema = z.object({
  name: z
    .string()
    .trim()
    .min(3)
    .max(32),

  email: emailSchema,
  password: passwordSchema,
})
