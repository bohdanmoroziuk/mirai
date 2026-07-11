import type { SuccessOutput } from '@core/shared/types/api'

export type DeleteTagInput = {
  tagId: string
  userId: string
}

export type DeleteTagOutput = SuccessOutput
