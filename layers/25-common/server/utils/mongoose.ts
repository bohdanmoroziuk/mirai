import type { Model, Schema } from 'mongoose'
import mongoose, { Types } from 'mongoose'
import type { Nullish } from '@core/shared/types/common'

const { model, models } = mongoose

export const createMongooseModel = <T>(
  name: string,
  schema: Schema<T>,
): Model<T> => {
  return (models[name] as Model<T> | undefined) || model<T>(name, schema)
}

export const toObjectId = (rawId: string): Types.ObjectId => {
  return new Types.ObjectId(rawId)
}

export const toNullableObjectId = (rawId: Nullish<string>): Nullish<Types.ObjectId> => {
  return isNullish(rawId)
    ? undefined
    : toObjectId(rawId)
}
