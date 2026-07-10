import { toGetTagsInput } from '../mappers/tag-input.mapper'
import { useTagsQuery } from '../queries/tag.queries'

export const useTagListWorkflow = () => {
  const search = ref('')
  const debouncedSearch = refDebounced(search, 500)

  const tagsQueryInput = computed(() => {
    return toGetTagsInput({
      search: debouncedSearch.value,
    })
  })

  const { data: tags, isPending, error } = useTagsQuery(tagsQueryInput)

  return {
    search,
    tags,
    isPending,
    error,
  }
}
