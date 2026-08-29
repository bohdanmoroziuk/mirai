import { makeMongoCaseRepository } from './infra/mongo/repositories/case.mongo.repository'
import { makeCreateCaseUseCase } from './use-cases/create-case.use-case'
import { makeGetCaseUseCase } from './use-cases/get-case.use-case'
import { makeGetCasesUseCase } from './flows/getCases/getCases.use-case'
import { makeGetCaseOverviewsUseCase } from './flows/getCaseOverviews/getCaseOverviews.use-case'
import { makeUpdateCaseUseCase } from './use-cases/update-case.use-case'
import { makeDeleteCaseUseCase } from './flows/deleteCase/deleteCase.use-case'

const caseRepository = makeMongoCaseRepository()

export const createCase = makeCreateCaseUseCase(caseRepository)
export const getCase = makeGetCaseUseCase(caseRepository)
export const getCases = makeGetCasesUseCase(caseRepository)
export const getCaseOverviews = makeGetCaseOverviewsUseCase(caseRepository)
export const getCaseStats = makeGetCaseStatsUseCase(caseRepository)
export const updateCase = makeUpdateCaseUseCase(caseRepository)
export const deleteCase = makeDeleteCaseUseCase(caseRepository)
