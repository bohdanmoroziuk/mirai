import { Schema } from 'mongoose'
import type { UserSchema } from '@user/server/types/user'
import { createMongooseModel } from '@common/server/utils/mongoose'

export const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
})

export const UserModel = createMongooseModel<UserSchema>('User', userSchema)
