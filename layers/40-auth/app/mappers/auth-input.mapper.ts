import type { LoginFormState, LoginInput, SignupFormState, SignupInput } from '../types/auth'

export const toLoginInput = (state: LoginFormState): LoginInput => {
  return {
    body: {
      email: state.email,
      password: state.password,
    },
  }
}

export const toSignupInput = (state: SignupFormState): SignupInput => {
  return {
    body: {
      name: state.name,
      email: state.email,
      password: state.password,
    },
  }
}
