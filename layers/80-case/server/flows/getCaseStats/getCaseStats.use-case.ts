import type { CaseRepository } from '../../ports/case.repository.port'

export const makeGetCaseStatsUseCase = (caseRepository: CaseRepository) => {
  return (input: GetCaseStatsInput): Promise<CaseStats> => caseRepository.getStats(input)
}
