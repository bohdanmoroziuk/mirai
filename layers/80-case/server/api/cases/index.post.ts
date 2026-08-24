import { HttpStatus } from '@core/shared/constants/http'
import { requireUserId } from '@common/server/utils/auth'
import { createCase } from '../../case.container'
import { toCreateCaseInput } from '../../mappers/create-case.mapper'
import { createCaseBodySchema } from '../../schemas/create-case.schema'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const body = await validateBody(event, createCaseBodySchema)
  const caseItem = await createCase(toCreateCaseInput(userId, body))

  setResponseStatus(event, HttpStatus.CREATED)
  return createResponse(caseItem)
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Create case',
    description: 'Creates a new case for the authenticated user.',
    security: [{ cookieAuth: [] }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title'],
            properties: {
              title: { type: 'string', example: 'Dental treatment' },
              description: { type: 'string', example: 'Plan and track appointments.' },
            },
          },
        },
      },
    },
    responses: {
      201: { description: 'Case created successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
    },
  },
})
