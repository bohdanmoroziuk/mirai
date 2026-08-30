import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { caseKeys } from '../../queries/case.keys'
import { caseGateway } from '../../gateways/case.gateway'

export const useUpdateCaseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: caseKeys.update(),
    mutationFn: (input: UpdateCaseInput) => {
      return caseGateway.updateOne(input)
    },
    onSuccess: async (_, input) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: caseKeys.detail(input.params),
        }),

        queryClient.invalidateQueries({
          queryKey: caseKeys.query('overviews'),
        }),

        queryClient.invalidateQueries({
          queryKey: caseKeys.lists(),
        }),
      ])
    },
  })
}
