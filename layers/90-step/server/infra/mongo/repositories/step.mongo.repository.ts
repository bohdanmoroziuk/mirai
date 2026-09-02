import type { StepRepository } from '../../../ports/step.repository.port'
import { toStep } from '../mappers/step.mongo.mapper'
import { StepModel } from '../models/step.mongo.model'
import { toCreateStepData } from '../operations/createStep'

export const makeMongoStepRepository = (): StepRepository => {
  return {
    async createOne(input) {
      const data = toCreateStepData(input)
      const document = await StepModel.create(data)
      return toStep(document)
    },
  }
}
