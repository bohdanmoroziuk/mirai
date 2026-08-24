import { requireUserId } from '@common/server/utils/auth'
import { bookmarkParamsSchema } from '../../../schemas/bookmark-params.schema'
import { toDeleteBookmarkInput } from '../../../mappers/delete-bookmark.mapper'
import { deleteBookmark } from '../../../bookmark.container'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, bookmarkParamsSchema)
  const result = await deleteBookmark(toDeleteBookmarkInput(userId, params))

  return result
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
