import { useQuery } from '@tanstack/vue-query'
import { caseGateway } from '../../gateways/case.gateway'

export const useCaseStatsQuery = () => {
  return useQuery<
    ApiResponse<CaseStats>,
    Error,
    CaseStats
  >({
    queryKey: ['case', 'stats'],
    queryFn: () => {
      return caseGateway.getStats()
    },
    select: selectApiData,
  })
}
