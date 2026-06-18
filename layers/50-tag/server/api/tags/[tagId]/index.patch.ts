import { updateTagBodySchema, updateTagParamsSchema } from '@tag/server/schemas/tag.schema'
import { updateTag } from '@tag/server/services/tag.service'
import { toUpdateTagInput } from '@tag/server/mappers/tag.mapper'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, updateTagParamsSchema)
  const body = await validateBody(event, updateTagBodySchema)
  const tag = await updateTag(toUpdateTagInput(session, params, body))

  return createResponse(tag)
})
