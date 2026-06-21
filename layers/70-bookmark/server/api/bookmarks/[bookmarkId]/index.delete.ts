import { deleteBookmarkParamsSchema } from '../../../schemas/bookmark.schema'
import { toDeleteBookmarkInput } from '../../../mappers/bookmark.mapper'
import { deleteBookmark } from '../../../services/bookmark.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, deleteBookmarkParamsSchema)
  const result = await deleteBookmark(toDeleteBookmarkInput(session, params))

  return createResponse(result)
})

defineRouteMeta({
  openAPI: {
    tags: ['Bookmarks'],
    summary: 'Delete bookmark',
    description: 'Deletes a bookmark by ID or throws a 404 error if the bookmark does not exist.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'bookmarkId',
        in: 'path',
        required: true,
        description: 'Bookmark ID.',
        schema: {
          type: 'string',
          example: '665f1b8e1b7c2f0012a4c123',
        },
      },
    ],
    responses: {
      200: {
        description: 'Bookmark deleted successfully',
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
        description: 'Bookmark not found',
      },
    },
  },
})
