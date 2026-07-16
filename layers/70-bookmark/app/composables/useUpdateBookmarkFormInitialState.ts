import { getBookmarkFormInitialState, toBookmarkFormState } from '../mappers/bookmark.mapper'
import { toGetBookmarkInput } from '../mappers/bookmark-input.mapper'
import { useBookmarkQuery } from '../queries/bookmark.queries'

export const useUpdateBookmarkFormInitialState = (
  bookmarkId: MaybeRefOrGetter<string>,
) => {
  const bookmarkQueryInput = computed(() => {
    return toGetBookmarkInput(toValue(bookmarkId))
  })

  const {
    data: bookmark,
    isPending: isRefreshing,
    error,
    refetch: refresh,
  } = useBookmarkQuery(bookmarkQueryInput)

  const initialState = computed(() => {
    return isDefined(bookmark)
      ? toBookmarkFormState(toValue(bookmark))
      : getBookmarkFormInitialState()
  })

  return {
    initialState,
    isRefreshing,
    error,
    refresh,
  }
}
