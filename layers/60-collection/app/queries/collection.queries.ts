import { useQuery } from '@tanstack/vue-query'
import { collectionKeys } from './collection.keys'
import { collectionRepository } from '../repositories/collection.repository'

export const useCollectionsQuery = () => {
  return useQuery<
    ApiResponse<Collection[]>,
    Error,
    Collection[]
  >({
    queryKey: collectionKeys.lists,
    queryFn: collectionRepository.getMany,
    select: selectApiData,
  })
}
