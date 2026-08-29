import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { caseKeys } from '../../queries/case.keys'
import { caseGateway } from '../../gateways/case.gateway'

export const useDeleteCaseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: caseKeys.delete(),
    mutationFn: (input: DeleteCaseInput) => {
      return caseGateway.deleteOne(input)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: caseKeys.query('stats'),
        }),

        queryClient.invalidateQueries({
          queryKey: caseKeys.query('overviews'),
        }),
      ])
    },
  })
}
