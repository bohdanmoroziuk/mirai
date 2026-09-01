import { requireUserId } from '@common/server/utils/auth'
import { getCaseStats } from '../../../case.container'
import { toGetCaseStatsInput } from '../../../flows/getCaseStats'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const cases = await getCaseStats(toGetCaseStatsInput(userId))

  return cases
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Get case stats',
    description: 'Returns case statistics for the authenticated user.',
    security: [{ cookieAuth: [] }],
    responses: {
      200: { description: 'Case statistics returned successfully' },
      401: { description: 'Unauthorized' },
    },
  },
})
