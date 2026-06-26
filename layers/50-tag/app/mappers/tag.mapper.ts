import { DEFAULT_TAG_COLOR } from '../../shared/constants/tag'
import type { TagFormState } from '../types/tag'

export const getTagFormInitialState = (): TagFormState => ({
  name: '',
  color: DEFAULT_TAG_COLOR,
})

export const toBookmarkFormState = (tag: Tag): TagFormState => ({
  name: tag.name,
  color: tag.color ?? DEFAULT_TAG_COLOR,
})
