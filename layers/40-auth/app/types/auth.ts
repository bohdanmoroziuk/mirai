import type { z } from 'zod'
import type { SuccessOutput } from '@core/shared/types/api'
import type { signupFormStateSchema, loginFormStateSchema } from '../schemas/auth.schema'

export type SignupFormState = z.infer<typeof signupFormStateSchema>

export type LoginFormState = z.infer<typeof loginFormStateSchema>

export type SignupPayload = SignupFormState

export type LoginPayload = LoginFormState

export type SignupInput = {
  body: SignupPayload
}

export type LoginInput = {
  body: LoginPayload
}

export type LogoutOutput = SuccessOutput
