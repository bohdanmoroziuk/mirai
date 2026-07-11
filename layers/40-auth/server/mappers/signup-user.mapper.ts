import type { SignupUserBody, SignupUserInput } from '../types/signup-user.types'

export const toSignupUserInput = (body: SignupUserBody): SignupUserInput => {
  return {
    name: body.name,
    email: body.email,
    password: body.password,
  }
}
