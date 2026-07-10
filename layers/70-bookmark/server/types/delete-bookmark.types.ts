import type { SuccessOutput } from '@core/shared/types/api'

export type DeleteBookmarkInput = {
  bookmarkId: string
  userId: string
}

export type DeleteBookmarkOutput = SuccessOutput
