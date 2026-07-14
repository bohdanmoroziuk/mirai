import { z } from 'zod'

const emailSchema = z
  .email()
  .trim()

const passwordSchema = z
  .string()
  .min(8)

export const signupFormStateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3),
  email: emailSchema,
  password: passwordSchema,
})

export const loginFormStateSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
