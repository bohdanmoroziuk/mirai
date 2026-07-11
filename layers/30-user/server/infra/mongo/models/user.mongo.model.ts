import { Schema } from 'mongoose'
import type { UserFields } from '../types/user.mongo.types'

export const userSchema = new Schema<UserFields>({
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

export const UserModel = createMongooseModel<UserFields>('User', userSchema)
