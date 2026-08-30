import { mapValueOr } from '@core/shared/utils/value'
import type { CaseRepository } from '../../../ports/case.repository.port'
import { toCase } from '../mappers/case.mongo.mapper'
import { toCreateCaseData } from '../mappers/create-case.mongo.mapper'
import { toDeleteCaseQuery } from '../operations/deleteCase/deleteCase.mapper'
import { toFindCaseQuery } from '../operations/getCase/getCase.mapper'
import { toFindCasesQuery } from '../operations/getCases/getCases.mapper'
import { toCaseOverview, toFindCaseOverviewsQuery } from '../operations/getCaseOverviews/getCaseOverviews.mapper'
import { toUpdateCaseQuery } from '../operations/updateCase/updateCase.mapper'
import { CaseModel } from '../models/case.mongo.model'

export const makeMongoCaseRepository = (): CaseRepository => ({
  async createOne(input) {
    return toCase(await CaseModel.create(toCreateCaseData(input)))
  },
  async findOne(input) {
    const document = await CaseModel.findOne(toFindCaseQuery(input).filter).exec()
    return mapValueOr(document, toCase, null)
  },
  async findMany(input) {
    const query = toFindCasesQuery(input)
    const documents = await CaseModel.find(query.filter).sort(query.sort).exec()
    return documents.map(toCase)
  },
  async findOverviews(input) {
    const query = toFindCaseOverviewsQuery(input)
    const documents = await CaseModel.find(query.filter).sort(query.sort).exec()
    return documents.map(toCaseOverview)
  },
  async updateOne(input) {
    const query = toUpdateCaseQuery(input)
    const document = await CaseModel.findOneAndUpdate(query.filter, query.update, query.options).exec()
    return mapValueOr(document, toCase, null)
  },
  async deleteOne(input) {
    const document = await CaseModel.findOneAndDelete(toDeleteCaseQuery(input).filter).exec()
    return mapValueOr(document, toCase, null)
  },
  async getStats(input) {
    const query = toGetCaseStatsQuery(input)
    const caseStatsPipeline = createCaseStatsPipeline(query.filter.userId)
    const [stats] = await CaseModel.aggregate<CaseStats>(caseStatsPipeline)

    return stats ?? EMPTY_CASE_STATS
  },
})
