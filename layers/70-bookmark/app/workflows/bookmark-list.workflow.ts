import { toGetBookmarksInput } from '../mappers/bookmark-input.mapper'
import { useBookmarksQuery } from '../queries/bookmark.queries'

export const useBookmarkListWorkflow = (
  collectionId: MaybeRefOrGetter<Nullish<Collection['id']>>,
) => {
  const bookmarksQueryInput = computed(() => {
    return toGetBookmarksInput({
      collectionId: toValueOr(collectionId, undefined),
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
