import { mapValueOr } from '@core/shared/utils/value'
import type { CaseRepository } from '../../../ports/case.repository.port'
import { toCase } from '../mappers/case.mongo.mapper'
import { toCreateCaseData } from '../mappers/create-case.mongo.mapper'
import { toDeleteCaseQuery } from '../mappers/delete-case.mongo.mapper'
import { toFindCaseQuery } from '../mappers/get-case.mongo.mapper'
import { toFindCasesQuery } from '../mappers/get-cases.mongo.mapper'
import { toUpdateCaseQuery } from '../mappers/update-case.mongo.mapper'
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
  async updateOne(input) {
    const query = toUpdateCaseQuery(input)
    const document = await CaseModel.findOneAndUpdate(query.filter, query.update, query.options).exec()
    return mapValueOr(document, toCase, null)
  },
  async deleteOne(input) {
    const document = await CaseModel.findOneAndDelete(toDeleteCaseQuery(input).filter).exec()
    return mapValueOr(document, toCase, null)
  },
})
