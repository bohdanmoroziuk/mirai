import { useQuery } from '@tanstack/vue-query'
import { caseGateway } from '../../gateways/case.gateway'
import { caseKeys } from '../../queries/case.keys'

export const useCaseOverviewsQuery = () => {
  return useQuery<
    ApiResponse<CaseOverview[]>,
    Error,
    CaseOverview[]
  >({
    queryKey: caseKeys.query('overviews'),
    queryFn: () => {
      return caseGateway.getOverviews()
    },
    select: selectApiData,
  })
}
