import { useQuery } from '@tanstack/vue-query'
import { collectionRepository } from '../repositories/collection.repository'

export const useCollectionsQuery = () => {
  return useQuery<
    ApiResponse<Collection[]>,
    Error,
    Collection[]
  >({
    queryKey: ['collections'],
    queryFn: collectionRepository.getMany,
    select: selectApiData,
  })
}
