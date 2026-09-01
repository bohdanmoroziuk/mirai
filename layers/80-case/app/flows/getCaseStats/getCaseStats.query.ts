import { useQuery } from '@tanstack/vue-query'
import { caseGateway } from '../../gateways/case.gateway'
import { caseKeys } from '../../queries/case.keys'

export const useCaseStatsQuery = () => {
  return useQuery<
    ApiResponse<CaseStats>,
    Error,
    CaseStats
  >({
    queryKey: caseKeys.query('stats'),
    queryFn: () => {
      return caseGateway.getStats()
    },
    select: selectApiData,
  })
}
