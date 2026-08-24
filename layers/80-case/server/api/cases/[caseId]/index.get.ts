import { getCase } from '../../../case.container'
import { toGetCaseInput } from '../../../mappers/get-case.mapper'
import { caseParamsSchema } from '../../../schemas/case-params.schema'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, caseParamsSchema)
  const caseItem = await getCase(toGetCaseInput(userId, params))

  return caseItem
})

defineRouteMeta({
  openAPI: {
    tags: ['Cases'],
    summary: 'Get case',
    description: 'Returns a case by ID for the authenticated user.',
    security: [{ cookieAuth: [] }],
    parameters: [{
      name: 'caseId', in: 'path', required: true, description: 'Case ID.',
      schema: { type: 'string', example: '665f1b8e1b7c2f0012a4c123' },
    }],
    responses: {
      200: { description: 'Case returned successfully' },
      400: { description: 'Validation error' },
      401: { description: 'Unauthorized' },
      404: { description: 'Case not found' },
    },
  },
})
