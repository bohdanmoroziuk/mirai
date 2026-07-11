import type { UserWithPassword } from '../../../types/user.types'
import type { UserDocument } from '../types/user.mongo.types'

export const toUserWithPassword = (document: UserDocument): UserWithPassword => {
  return {
    id: document._id.toString(),
    name: document.name,
    email: document.email,
    passwordHash: document.passwordHash,
    avatarUrl: document.avatarUrl,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}
