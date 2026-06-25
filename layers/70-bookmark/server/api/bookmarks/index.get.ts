import { validateQuery } from '@common/server/utils/validation'
import { getBookmarksQuerySchema } from '../../schemas/bookmark.schema'
import { toGetBookmarksInput } from '../../mappers/bookmark.mapper'
import { getBookmarks } from '../../services/bookmark.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const query = await validateQuery(event, getBookmarksQuerySchema)
  const bookmarks = await getBookmarks(toGetBookmarksInput(session, query))

  return createResponse(bookmarks)
})

defineRouteMeta({
  openAPI: {
    tags: ['Bookmarks'],
    summary: 'Get bookmarks',
    description: 'Returns bookmarks that belong to the authenticated user. If collectionId is provided, returns only bookmarks from the given collection.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'collectionId',
        in: 'query',
        required: false,
        description: 'Collection ID used to filter bookmarks.',
        schema: {
          type: 'string',
          example: '665f1b8e1b7c2f0012a4c123',
        },
      },
    ],
    responses: {
      200: {
        description: 'Bookmarks returned successfully',
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
                      'description',
                      'url',
                      'isFavorite',
                      'userId',
                      'collectionId',
                      'tagIds',
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
                        example: 'Nuxt Documentation',
                      },
                      description: {
                        type: 'string',
                        example: '',
                      },
                      url: {
                        type: 'string',
                        format: 'uri',
                        example: 'https://nuxt.com/docs',
                      },
                      isFavorite: {
                        type: 'boolean',
                        example: false,
                      },
                      userId: {
                        type: 'string',
                        example: '665f1b8e1b7c2f0012a4c999',
                      },
                      collectionId: {
                        type: 'string',
                        nullable: true,
                        example: '665f1b8e1b7c2f0012a4c123',
                      },
                      tagIds: {
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        example: ['665f1b8e1b7c2f0012a4c456'],
                      },
                      createdAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-18T10:30:00.000Z',
                      },
                      updatedAt: {
                        type: 'string',
                        format: 'date-time',
                        example: '2026-06-18T10:30:00.000Z',
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
