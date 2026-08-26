import type { CaseStats } from '../../../shared/types/case'
import type { CaseRepository } from '../../ports/case.repository.port'
import type { GetCaseStatsInput } from './getCaseStats.types'

export const makeGetCaseStatsUseCase = (caseRepository: CaseRepository) => {
  return (input: GetCaseStatsInput): Promise<CaseStats> => caseRepository.getStats(input)
}
