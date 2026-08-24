import { validateParams } from '@common/server/utils/validation'
import { requireUserId } from '@common/server/utils/auth'
import { collectionParamsSchema } from '../../../schemas/collection-params.schema'
import { toDeleteCollectionInput } from '../../../mappers/delete-collection.mapper'
import { deleteCollection } from '../../../collection.container'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, collectionParamsSchema)
  const result = await deleteCollection(toDeleteCollectionInput(userId, params))

  return result
})

defineRouteMeta({
  openAPI: {
    tags: ['Collections'],
    summary: 'Delete collection',
    description: 'Deletes a collection that belongs to the authenticated user.',
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
        description: 'Collection deleted successfully',
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
        description: 'Collection not found',
      },
    },
  },
})
