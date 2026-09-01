import { useQuery } from '@tanstack/vue-query'
import { caseGateway } from '../../gateways/case.gateway'
import { caseKeys } from '../../queries/case.keys'

export const useCasesQuery = () => {
  return useQuery<
    ApiResponse<Case[]>,
    Error,
    Case[]
  >({
    queryKey: caseKeys.list(),
    queryFn: () => {
      return caseGateway.getMany()
    },
    select: selectApiData,
  })
}
