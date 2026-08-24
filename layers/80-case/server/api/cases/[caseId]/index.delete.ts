import { deleteCase } from '../../../case.container'
import { toDeleteCaseInput } from '../../../mappers/delete-case.mapper'
import { caseParamsSchema } from '../../../schemas/case-params.schema'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, caseParamsSchema)
  const result = await deleteCase(toDeleteCaseInput(userId, params))

  return result
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Delete case',
    description: 'Deletes a case by ID for the authenticated user.',
    security: [{ cookieAuth: [] }],
    parameters: [{
      name: 'caseId', in: 'path', required: true, description: 'Case ID.',
      schema: { type: 'string', example: '665f1b8e1b7c2f0012a4c123' },
    }],
    responses: {
      200: { description: 'Case deleted successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
      404: { description: 'Case not found' },
    },
  },
})
