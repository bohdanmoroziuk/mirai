import { z } from 'zod'

export const createUserBodySchema = z.object({
  name: z.string().trim().min(3).max(30),
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8).max(20),
})
