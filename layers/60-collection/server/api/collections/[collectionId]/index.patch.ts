import { updateCollectionBodySchema, updateCollectionParamsSchema } from '../../../schemas/collection.schema'
import { updateCollection } from '../../../services/collection.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, updateCollectionParamsSchema)
  const body = await validateBody(event, updateCollectionBodySchema)
  const collection = await updateCollection({
    title: body.title,
    userId: session.user.id,
    collectionId: params.collectionId,
  })

  return createResponse(collection)
})

defineRouteMeta({
  openAPI: {
    tags: ['Collections'],
    summary: 'Update collection',
    description: 'Updates a collection that belongs to the authenticated user or throws a 404 error if the collection does not exist.',
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
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Collection updated successfully',
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
                      example: 'Development Updated',
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
                      example: '2026-06-15T10:45:00.000Z',
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
