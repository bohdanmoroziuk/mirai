import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { GetTagsQuery } from '../types/tag'
import { tagRepository } from '../repositories/tag.repository'

export const useTagsQuery = (
  query: MaybeRefOrGetter<GetTagsQuery> = {},
) => {
  const { isFetching, error, data: tags } = useQuery<
    ApiResponse<Tag[]>,
    Error,
    Tag[]
  >({
    queryKey: computed(() => ['tags', toValue(query)]),
    queryFn: () => tagRepository.getMany(toValue(query)),
    initialData: toApiResponse([]),
    initialDataUpdatedAt: 0,
    select: selectApiData,
  })

  return {
    tags,
    error,
    isFetching,
  }
}

export const useCreateTagMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending: loading,
    mutateAsync: createTag,
  } = useMutation({
    mutationKey: ['tags', 'create'],
    mutationFn: tagRepository.createOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tags'],
      })
    },
  })

  return {
    loading,
    createTag,
  }
}
