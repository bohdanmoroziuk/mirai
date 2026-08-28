import { requireUserId } from '@common/server/utils/auth'
import { getCaseOverviews } from '../../../case.container'
import { toGetCaseOverviewsInput } from '../../../flows/getCaseOverviews/getCaseOverviews.mapper'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const caseOverviews = await getCaseOverviews(toGetCaseOverviewsInput(userId))

  return caseOverviews
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Get case overviews',
    description: 'Returns case overviews that belong to the authenticated user.',
    security: [{ cookieAuth: [] }],
    responses: {
      200: { description: 'Case overviews returned successfully' },
      401: { description: 'Unauthorized' },
    },
  },
})
