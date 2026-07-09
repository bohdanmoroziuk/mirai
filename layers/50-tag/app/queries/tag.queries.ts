import { useQuery } from '@tanstack/vue-query'
import type { GetTagsInput } from '../types/tag'
import { tagRepository } from '../repositories/tag.repository'

export const useTagsQuery = (
  input: MaybeRefOrGetter<GetTagsInput> = {},
) => {
  return useQuery<
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
}
