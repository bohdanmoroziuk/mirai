import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { collectionRepository } from '../repositories/collection.repository'
import type { CreateCollectionInput } from '../types/collection'

const getInitialCollectionsResponse = (): ApiResponse<Collection[]> => {
  return toApiResponse([])
}

export const useCollectionsQuery = () => {
  const {
    data: collections,
    error,
    isFetching: loading,
  } = useQuery<
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
    loading,
    collections,
  }
}

export const useCreateCollectionMutation = () => {
  const queryClient = useQueryClient()

  const {
    isPending: loading,
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
    loading,
    createCollection,
  }
}
