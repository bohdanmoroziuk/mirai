import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { GetTagsInput } from '../types/tag'
import { tagRepository } from '../repositories/tag.repository'

export const useTagsQuery = (
  input: MaybeRefOrGetter<GetTagsInput> = {},
) => {
  const { isFetching, error, data: tags } = useQuery<
    ApiResponse<Tag[]>,
    Error,
    Tag[]
  >({
    queryKey: computed(() => ['tags', toValue(input)]),
    queryFn: () => tagRepository.getMany(toValue(input)),
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

export const useDeleteTagMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending: loading,
    mutateAsync: deleteTag,
  } = useMutation({
    mutationKey: ['tags', 'delete'],
    mutationFn: tagRepository.deleteOne,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['tags'],
      })
    },
  })

  return {
    loading,
    deleteTag,
  }
}
