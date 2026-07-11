import { requireUserId } from '@common/server/utils/auth'
import { collectionParamsSchema } from '../../../schemas/collection-params.schema'
import { toGetCollectionInput } from '../../../mappers/get-collection.mapper'
import { getCollection } from '../../../collection.container'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, collectionParamsSchema)
  const collection = await getCollection(toGetCollectionInput(userId, params))

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
