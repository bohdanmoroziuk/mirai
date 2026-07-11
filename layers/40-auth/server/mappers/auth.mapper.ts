import type { User } from '@user/shared/types/user'
import type { AuthUser } from '../../shared/types/auth'

export const toAuthUser = (user: User): AuthUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  }
}
