import { toGetBookmarksInput } from '@bookmark/server/mappers/bookmark.mapper'
import { getBookmarks } from '@bookmark/server/services/bookmark.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const bookmarks = await getBookmarks(toGetBookmarksInput(session))

  return createResponse(bookmarks)
})

defineRouteMeta({
  openAPI: {
    tags: ['Bookmarks'],
    summary: 'Get bookmarks',
    description: 'Returns bookmarks that belong to the authenticated user.',
    security: [
      {
        cookieAuth: [],
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
                        example: null,
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
      401: {
        description: 'Unauthorized',
      },
    },
  },
})
