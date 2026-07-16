import { toGetBookmarksInput } from '../mappers/bookmark-input.mapper'
import { useBookmarksQuery } from '../queries/bookmark.queries'

export const useBookmarkListWorkflow = (
  collectionId: MaybeRefOrGetter<Optional<string>>,
) => {
  const bookmarksQueryInput = computed(() => {
    return toGetBookmarksInput({
      collectionId: toValue(collectionId),
    })
  })

  const {
    data: bookmarks,
    error,
    isPending,
    isFetching,
  } = useBookmarksQuery(bookmarksQueryInput)

  return {
    bookmarks,
    error,
    isPending,
    isFetching,
  }
}
