import { makeMongoCaseRepository } from './infra/mongo/repositories/case.mongo.repository'
import { makeCreateCaseUseCase } from './flows/createCase'
import { makeDeleteCaseUseCase } from './flows/deleteCase'
import { makeGetCaseUseCase } from './flows/getCase'
import { makeGetCaseOverviewsUseCase } from './flows/getCaseOverviews'
import { makeGetCaseStatsUseCase } from './flows/getCaseStats'
import { makeGetCasesUseCase } from './flows/getCases'
import { makeUpdateCaseUseCase } from './flows/updateCase'

const caseRepository = makeMongoCaseRepository()

export const createCase = makeCreateCaseUseCase(caseRepository)
export const getCase = makeGetCaseUseCase(caseRepository)
export const getCases = makeGetCasesUseCase(caseRepository)
export const getCaseOverviews = makeGetCaseOverviewsUseCase(caseRepository)
export const getCaseStats = makeGetCaseStatsUseCase(caseRepository)
export const updateCase = makeUpdateCaseUseCase(caseRepository)
export const deleteCase = makeDeleteCaseUseCase(caseRepository)
