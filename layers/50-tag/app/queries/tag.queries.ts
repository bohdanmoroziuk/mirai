import { useQuery } from '@tanstack/vue-query'
import { getListQuery } from '@common/app/utils/query-keys'
import { tagRepository } from '../repositories/tag.repository'
import { tagKeys } from './tag.keys'
import type { GetTagsInput } from '../types/tag'

export const useTagsQuery = (
  input: MaybeRefOrGetter<GetTagsInput> = {},
) => {
  return useQuery<
    ApiResponse<Tag[]>,
    Error,
    Tag[]
  >({
    queryKey: computed(() => {
      return tagKeys.list(getListQuery(toValue(input)))
    }),
    queryFn: () => {
      return tagRepository.getMany(toValue(input))
    },
    select: selectApiData,
  })
}
