import type { z } from 'zod'
import type { signupFormSchema } from '@auth/app/schemas/auth.schema'

export type SignupFormState = z.infer<typeof signupFormSchema>

export type SignupInput = SignupFormState

export type LogoutOutput = {
  success: true
}
