import { makeCreateStepUseCase } from './flows/createStep'
import { makeMongoStepRepository } from './infra/mongo/repositories/step.mongo.repository'

const stepRepository = makeMongoStepRepository()

export const createStep = makeCreateStepUseCase(stepRepository)
export const getSteps = makeGetStepsUseCase(stepRepository)
