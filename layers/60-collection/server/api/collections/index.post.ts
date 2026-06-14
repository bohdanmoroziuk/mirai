import { createCollectionBodySchema } from '@collection/server/schemas/collection.schema'
import { createCollection } from '@collection/server/services/collection.service'

defineRouteMeta({
  openAPI: {
    tags: ['Collections'],
    summary: 'Create collection',
    description: 'Creates a new collection for the authenticated user.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title'],
            properties: {
              title: {
                type: 'string',
                example: 'Development',
              },
              parentId: {
                type: 'string',
                nullable: true,
                example: null,
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Collection created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
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
      400: {
        description: 'Validation error',
      },
      401: {
        description: 'Unauthorized',
      },
    },

    $global: {
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'nuxt-session',
          },
        },
      },
    },
  },
})

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await validateBody(event, createCollectionBodySchema)
  const collection = await createCollection({
    title: body.title,
    userId: session.user.id,
    parentId: body.parentId,
  })

  setResponseStatus(event, 201)

  return createResponse(collection)
}, {
  reportError: reportServerError,
})
