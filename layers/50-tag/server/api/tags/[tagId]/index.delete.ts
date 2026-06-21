import { deleteTagParamsSchema } from '../../../schemas/tag.schema'
import { toDeleteTagInput } from '../../../mappers/tag.mapper'
import { deleteTag } from '../../../services/tag.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, deleteTagParamsSchema)
  const result = await deleteTag(toDeleteTagInput(session, params))

  return createResponse(result)
})

defineRouteMeta({
  openAPI: {
    tags: ['Tags'],
    summary: 'Delete tag',
    description: 'Deletes a tag that belongs to the authenticated user or throws a 404 error if the tag does not exist.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'tagId',
        in: 'path',
        required: true,
        description: 'Tag ID.',
        schema: {
          type: 'string',
          example: '665f1b8e1b7c2f0012a4c123',
        },
      },
    ],
    responses: {
      200: {
        description: 'Tag deleted successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'object',
                  required: ['success'],
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Validation error',
      },
      401: {
        description: 'Unauthorized',
      },
      404: {
        description: 'Tag not found',
      },
    },
  },
})
