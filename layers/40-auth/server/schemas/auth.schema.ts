import { z } from 'zod'

export const signupBodySchema = z.object({
  name: z.string().trim().min(3).max(32),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(24),
})

export const loginBodySchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(24),
})
