import { updateBookmarkBodySchema, updateBookmarkParamsSchema } from '../../../schemas/bookmark.schema'
import { toUpdateBookmarkInput } from '../../../mappers/bookmark.mapper'
import { updateBookmark } from '../../../services/bookmark.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const params = await validateParams(event, updateBookmarkParamsSchema)
  const body = await validateBody(event, updateBookmarkBodySchema)
  const bookmark = await updateBookmark(toUpdateBookmarkInput(session, params, body))

  return createResponse(bookmark)
})

defineRouteMeta({
  openAPI: {
    tags: ['Bookmarks'],
    summary: 'Update bookmark',
    description: 'Updates a bookmark by ID or throws a 404 error if the bookmark does not exist.',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
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
                example: true,
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
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Bookmark updated successfully',
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
                      example: true,
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
                      example: '2026-06-18T10:45:00.000Z',
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
