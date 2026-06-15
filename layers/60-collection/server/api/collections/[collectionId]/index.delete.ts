import { validateParams } from '@core/server/utils/validation'
import { deleteCollectionParamsSchema } from '@collection/server/schemas/collection.schema'
import { deleteCollection } from '@collection/server/services/collection.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, deleteCollectionParamsSchema)
  const result = await deleteCollection({
    collectionId: params.collectionId,
    userId: session.user.id,
  })

  return createResponse(result)
}, {
  reportError: reportServerError,
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
