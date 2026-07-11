import { requireUserId } from '@common/server/utils/auth'
import { tagParamsSchema } from '../../../schemas/tag-params.schema'
import { updateTagBodySchema } from '../../../schemas/update-tag.schema'
import { toUpdateTagInput } from '../../../mappers/update-tag.mapper'
import { updateTag } from '../../../tag.container'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, tagParamsSchema)
  const body = await validateBody(event, updateTagBodySchema)
  const tag = await updateTag(toUpdateTagInput(userId, params, body))

  return createResponse(tag)
})
