import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { collectionRepository } from '../repositories/collection.repository'
import type { CreateCollectionInput } from '../types/collection'

const getInitialCollectionsResponse = (): ApiResponse<Collection[]> => {
  return toApiResponse([])
}

export const useCollectionsQuery = () => {
  const { data, error, isFetching } = useQuery<
    ApiResponse<Collection[]>,
    Error,
    Collection[]
  >({
    queryKey: ['collections'],
    queryFn: () => collectionRepository.getMany(),
    initialData: getInitialCollectionsResponse,
    initialDataUpdatedAt: 0,
    select: selectApiData,
  })

  return {
    error,
    isFetching,
    collections: data,
  }
}

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending,
    mutateAsync: createCollection,
  } = useMutation({
    mutationKey: ['collections', 'create'],
    mutationFn: (input: CreateCollectionInput) => collectionRepository.createOne(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['collections'],
      })
    },
  })

  return {
    isPending,
    createCollection,
  }
}
