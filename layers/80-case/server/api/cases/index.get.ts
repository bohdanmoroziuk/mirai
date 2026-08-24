import { requireUserId } from '@common/server/utils/auth'
import { getCases } from '../../case.container'
import { toGetCasesInput } from '../../mappers/get-cases.mapper'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const cases = await getCases(toGetCasesInput(userId))

  return createResponse(cases)
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Get cases',
    description: 'Returns cases that belong to the authenticated user.',
    security: [{ cookieAuth: [] }],
    responses: {
      200: { description: 'Cases returned successfully' },
      401: { description: 'Unauthorized' },
    },
  },
})
