import { updateCase } from '../../../case.container'
import { toUpdateCaseInput } from '../../../mappers/update-case.mapper'
import { caseParamsSchema } from '../../../schemas/case-params.schema'
import { updateCaseBodySchema } from '../../../schemas/update-case.schema'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, caseParamsSchema)
  const body = await validateBody(event, updateCaseBodySchema)
  const caseItem = await updateCase(toUpdateCaseInput(userId, params, body))

  return createResponse(caseItem)
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Update case',
    description: 'Updates a case by ID for the authenticated user.',
    security: [{ cookieAuth: [] }],
    parameters: [{
      name: 'caseId', in: 'path', required: true, description: 'Case ID.',
      schema: { type: 'string', example: '665f1b8e1b7c2f0012a4c123' },
    }],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            description: 'At least one field must be provided.',
            properties: {
              title: { type: 'string', example: 'Dental treatment' },
              description: { type: 'string', example: 'Updated treatment plan.' },
            },
          },
        },
      },
    },
    responses: {
      200: { description: 'Case updated successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
      404: { description: 'Case not found' },
    },
  },
})
