import { getTags } from '../../services/tag.service'
import { toGetTagsInput } from '../../mappers/tag.mapper'
import { getTagsQuerySchema } from '../../schemas/tag.schema'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const query = await validateQuery(event, getTagsQuerySchema)
  const tags = await getTags(toGetTagsInput(session, query))

  return createResponse(tags)
})

defineRouteMeta({
  openAPI: {
    tags: ['Tags'],
    summary: 'Get tags',
    description: 'Returns tags that belong to the authenticated user. If search is provided, returns only tags that match the search query.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'search',
        in: 'query',
        required: false,
        description: 'Search query used to filter tags by name.',
        schema: {
          type: 'string',
          example: 'important',
        },
      },
    ],
    responses: {
      200: {
        description: 'Tags returned successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'array',
                  items: {
                    type: 'object',
                    required: [
                      'id',
                      'name',
                      'color',
                      'userId',
                      'createdAt',
                      'updatedAt',
                    ],
                    properties: {
                      id: {
                        type: 'string',
                        example: '665f1b8e1b7c2f0012a4c123',
                      },
                      name: {
                        type: 'string',
                        example: 'Important',
                      },
                      color: {
                        type: 'string',
                        nullable: true,
                        example: '#F59E0B',
                      },
                      userId: {
                        type: 'string',
                        example: '665f1b8e1b7c2f0012a4c999',
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-17T10:30:00.000Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-17T10:30:00.000Z',
                      },
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
    },
  },
})
