import { HttpStatus } from '@core/shared/constants/http'
import { requireUserId } from '@common/server/utils/auth'
import { createStep } from '../../step.container'
import { createStepBodySchema, toCreateStepInput } from '../../flows/createStep'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const body = await validateBody(event, createStepBodySchema)
  const step = await createStep(toCreateStepInput(userId, body))

  setResponseStatus(event, HttpStatus.CREATED)

  return step
})

defineRouteMeta({
  openAPI: {
    tags: ['Steps'],
    summary: 'Create step',
    description: 'Creates a new case step for the authenticated user.',
    security: [{ cookieAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['caseId', 'title', 'description'],
            properties: {
              caseId: { type: 'string', example: '665f1b8e1b7c2f0012a4c123' },
              title: { type: 'string', example: 'Rent a car' },
              description: { type: 'string', example: 'Rent a car for the trip.' },
            },
          },
        },
      },
    },
    responses: {
      201: { description: 'Step created successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
    },
  },
})
