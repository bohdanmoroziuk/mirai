import type { Nullish } from '@core/shared/types/common'
import type { Entity, Timestamps } from '@core/shared/types/entity'

export type UserEntity = {
  name: string
  email: string
  password: string
  avatarUrl: Nullish<string>
}

export type User
  = & Entity
    & UserEntity
    & Timestamps
