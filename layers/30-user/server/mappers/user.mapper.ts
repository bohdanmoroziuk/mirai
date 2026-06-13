import type { User } from '@user/shared/types/user'
import type { UserDocument } from '@user/server/types/user'

export const mapUser = (document: UserDocument): User => {
  return {
    id: document._id.toString(),
    name: document.name,
    email: document.email,
    avatarUrl: document.avatarUrl,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
  }
}
