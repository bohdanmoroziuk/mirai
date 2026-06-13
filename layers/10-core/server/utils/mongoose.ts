import mongoose, { type Model, type Schema } from 'mongoose'

const { model, models } = mongoose

export const createMongooseModel = <T>(
  name: string,
  schema: Schema<T>,
): Model<T> => {
  return (models[name] as Model<T> | undefined) || model<T>(name, schema)
}
