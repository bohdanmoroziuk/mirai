import { getCollectionParamsSchema } from '../../../schemas/collection.schema'
import { getCollection } from '../../../services/collection.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, getCollectionParamsSchema)
  const collection = await getCollection({
    collectionId: params.collectionId,
    userId: session.user.id,
  })

  return createResponse(collection)
})

defineRouteMeta({
  openAPI: {
    tags: ['Collections'],
    summary: 'Get collection',
    description: 'Returns a collection by ID or throws a 404 error if the collection does not exist.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'collectionId',
        in: 'path',
        required: true,
        description: 'Collection ID.',
        schema: {
          type: 'string',
          example: '665f1b8e1b7c2f0012a4c123',
        },
      },
    ],
    responses: {
      200: {
        description: 'Collection returned successfully',
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
      404: {
        description: 'Collection not found',
      },
    },
  },
})
