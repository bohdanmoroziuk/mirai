import type { z } from 'zod'
import type { SuccessOutput } from '@core/shared/types/api'
import type { signupFormSchema, loginFormSchema } from '@auth/app/schemas/auth.schema'

export type SignupFormState = z.infer<typeof signupFormSchema>

export type LoginFormState = z.infer<typeof loginFormSchema>

export type SignupInput = SignupFormState

export type LoginInput = LoginFormState

export type LogoutOutput = SuccessOutput
