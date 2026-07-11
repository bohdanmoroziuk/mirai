import { userRepository } from '@user/server/user.repository.container'
import { makeSignupUserUseCase } from './use-cases/signup-user.use-case'
import { makeLoginUserUseCase } from './use-cases/login-user.use-case'

export const signupUser = makeSignupUserUseCase(userRepository)
export const loginUser = makeLoginUserUseCase(userRepository)
