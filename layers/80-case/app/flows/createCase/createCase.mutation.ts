import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { caseKeys } from '../../queries/case.keys'
import { caseGateway } from '../../gateways/case.gateway'

export const useCreateCaseMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: caseKeys.create(),
    mutationFn: (input: CreateCaseInput) => {
      return caseGateway.createOne(input)
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: caseKeys.query('stats'),
        }),

        queryClient.invalidateQueries({
          queryKey: caseKeys.lists(),
        }),
      ])
    },
  })
}
