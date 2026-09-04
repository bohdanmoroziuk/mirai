import { useQuery } from '@tanstack/vue-query'
import { stepKeys } from '../../queries/step.keys'
import { stepGateway } from '../../gateways/step.gateway'

export const useStepsQuery = (
  input: MaybeRefOrGetter<GetStepsInput>,
) => {
  return useQuery<
    ApiResponse<Step[]>,
    Error,
    Step[]
  >({
    queryKey: computed(() => {
      return stepKeys.list(getListQuery(toValue(input)))
    }),
    queryFn: () => {
      return stepGateway.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
