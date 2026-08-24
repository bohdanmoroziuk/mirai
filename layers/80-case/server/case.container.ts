import { makeMongoCaseRepository } from './infra/mongo/repositories/case.mongo.repository'
import { makeCreateCaseUseCase } from './use-cases/create-case.use-case'
import { makeDeleteCaseUseCase } from './use-cases/delete-case.use-case'
import { makeGetCaseUseCase } from './use-cases/get-case.use-case'
import { makeGetCasesUseCase } from './use-cases/get-cases.use-case'
import { makeUpdateCaseUseCase } from './use-cases/update-case.use-case'

const caseRepository = makeMongoCaseRepository()

export const createCase = makeCreateCaseUseCase(caseRepository)
export const deleteCase = makeDeleteCaseUseCase(caseRepository)
export const getCase = makeGetCaseUseCase(caseRepository)
export const getCases = makeGetCasesUseCase(caseRepository)
export const updateCase = makeUpdateCaseUseCase(caseRepository)
