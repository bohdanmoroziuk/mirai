import type { User } from '../../shared/types/user'
import type { UserDocument } from '../types/user'

export const mapUser = (document: UserDocument): User => {
  return {
    id: document._id.toString(),
    name: document.name,
    email: document.email,
    avatarUrl: document.avatarUrl,
    createdAt: document.createdAt.toISOString(),
    updatedAt: document.updatedAt.toISOString(),
  }
}
