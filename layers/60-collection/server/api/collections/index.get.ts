import { getCollections } from '@collection/server/services/collection.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const collections = await getCollections({
    userId: session.user.id,
  })

  return createResponse(collections)
}, {
  reportError: reportServerError,
})

defineRouteMeta({
  openAPI: {
    tags: ['Collections'],
    summary: 'Get collections',
    description: 'Returns collections that belong to the authenticated user.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Collections returned successfully',
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
                      'title',
                      'userId',
                      'parentId',
                      'createdAt',
                      'updatedAt',
                    ],
                    properties: {
                      id: {
                        type: 'string',
                        example: '665f1b8e1b7c2f0012a4c123',
                      },
                      title: {
                        type: 'string',
                        example: 'Development',
                      },
                      userId: {
                        type: 'string',
                        example: '665f1b8e1b7c2f0012a4c999',
                      },
                      parentId: {
                        type: 'string',
                        nullable: true,
                        example: null,
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-15T10:30:00.000Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-15T10:30:00.000Z',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      401: {
        description: 'Unauthorized',
      },
    },
  },
})
