import { getBookmarkFormInitialState } from '../mappers/bookmark.mapper'
import type { BookmarkFormState } from '../types/bookmark'

export const useBookmarkFormInitialState = () => {
  const route = useRoute()
  const isRefreshing = ref(false)
  const initialState = reactive<BookmarkFormState>(getBookmarkFormInitialState())

  // TODO: Check for the presence of collectionId
  const getCollectionId = () => {
    const collectionId = route.query.collectionId

    return typeof collectionId === 'string'
      ? collectionId
      : null
  }

  const getUrl = async () => {
    const clipboardText = await readClipboardText()

    if (isNull(clipboardText)) return ''
    if (isValidUrl(clipboardText)) return clipboardText
    return ''
  }

  const refresh = async () => {
    isRefreshing.value = true

    try {
      initialState.collectionId = getCollectionId()
      initialState.url = await getUrl()
    }
    finally {
      isRefreshing.value = false
    }
  }

  return {
    initialState,
    isRefreshing,
    refresh,
  }
}
