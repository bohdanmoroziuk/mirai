import { updateTagBodySchema, updateTagParamsSchema } from '../../../schemas/tag.schema'
import { toUpdateTagInput } from '../../../mappers/tag.mapper'
import { updateTag } from '../../../services/tag.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, updateTagParamsSchema)
  const body = await validateBody(event, updateTagBodySchema)
  const tag = await updateTag(toUpdateTagInput(session, params, body))

  return createResponse(tag)
})
