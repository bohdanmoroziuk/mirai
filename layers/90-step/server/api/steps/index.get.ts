import { requireUserId } from '@common/server/utils/auth'
import { getSteps } from '../../step.container'
import { getStepsQuerySchema, toGetStepsInput } from '../../flows/getSteps'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const query = await validateQuery(event, getStepsQuerySchema)
  const steps = await getSteps(toGetStepsInput(userId, query))

  return steps
})

defineRouteMeta({
  openAPI: {
    tags: ['Steps'],
    summary: 'Get steps',
    description: 'Returns steps that belong to the authenticated user and the specified case.',
    security: [{ cookieAuth: [] }],
    parameters: [
      {
        name: 'caseId',
        in: 'query',
        required: true,
        description: 'Case ID used to filter steps.',
        schema: {
          type: 'string',
          example: '665f1b8e1b7c2f0012a4c123',
        },
      },
    ],
    responses: {
      200: { description: 'Steps returned successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
    },
  },
})
