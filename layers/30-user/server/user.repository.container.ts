import { makeMongoUserRepository } from './infra/mongo/repositories/user.mongo.repository'

export const userRepository = makeMongoUserRepository()
