import type { User } from '../../../../shared/types/user'
import type { UserDocument } from '../types/user.mongo.types'

export const toUser = (document: UserDocument): User => {
  return {
    id: document._id.toString(),
    name: document.name,
    email: document.email,
    password: document.passwordHash,
    avatarUrl: document.avatarUrl,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}
