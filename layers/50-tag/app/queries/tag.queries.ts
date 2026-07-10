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
    queryKey: computed(() => {
      return ['tags', toValue(input)]
    }),
    queryFn: () => {
      return tagRepository.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
