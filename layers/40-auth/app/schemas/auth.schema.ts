import { z } from 'zod'

export const signupFormSchema = z.object({
  name: z.string().trim().min(3),
  email: z.email().trim(),
  password: z.string().min(8),
})

export const loginFormSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8),
})
