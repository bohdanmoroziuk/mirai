import { useTagsQuery } from '../queries/tag.queries'

export const useSelectedTags = (tagIds: MaybeRefOrGetter<Nullish<readonly Tag['id'][]>>) => {
  const { data: tags, isPending } = useTagsQuery()

  const tagMap = computed(() => {
    return new Map(
      toValueOr(tags, []).map((tag) => {
        return [tag.id, tag]
      }),
    )
  })

  const selectedTags = computed(() => {
    return toValueOr(tagIds, [])
      .map(tagId => tagMap.value.get(tagId))
      .filter(isPresent)
  })

  const hasSelectedTags = computed(() => {
    return selectedTags.value.length > 0
  })

  return {
    selectedTags,
    hasSelectedTags,
    isPending,
  }
}
