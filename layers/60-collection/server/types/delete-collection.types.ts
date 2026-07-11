import type { SuccessOutput } from '@core/shared/types/api'

export type DeleteCollectionInput = {
  userId: string
  collectionId: string
}

export type DeleteCollectionOutput = SuccessOutput
