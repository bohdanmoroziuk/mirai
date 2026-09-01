import { useQuery } from '@tanstack/vue-query'
import { caseKeys } from '../../queries/case.keys'
import { caseGateway } from '../../gateways/case.gateway'

export const useCaseQuery = (
  input: MaybeRefOrGetter<GetCaseInput>,
) => {
  return useQuery<
    ApiResponse<Case>,
    Error,
    Case
  >({
    queryKey: computed(() => {
      return caseKeys.detail(getDetailParams(toValue(input)))
    }),
    queryFn: () => {
      return caseGateway.getOne(toValue(input))
    },
    select: selectApiData,
  })
}
