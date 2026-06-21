import { HttpStatus } from '@core/shared/constants/http'
import { createBookmarkBodySchema } from '../../schemas/bookmark.schema'
import { toCreateBookmarkInput } from '../../mappers/bookmark.mapper'
import { createBookmark } from '../../services/bookmark.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await validateBody(event, createBookmarkBodySchema)
  const bookmark = await createBookmark(toCreateBookmarkInput(session, body))

  setResponseStatus(event, HttpStatus.CREATED)

  return createResponse(bookmark)
})

defineRouteMeta({
  openAPI: {
    tags: ['Bookmarks'],
    summary: 'Create bookmark',
    description: 'Creates a new bookmark for the authenticated user.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['title', 'description', 'url'],
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
                default: false,
                example: false,
              },
              collectionId: {
                type: 'string',
                nullable: true,
                example: null,
              },
              tagIds: {
                type: 'array',
                default: [],
                items: {
                  type: 'string',
                },
                example: ['665f1b8e1b7c2f0012a4c123'],
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Bookmark created successfully',
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
      400: {
        description: 'Validation error',
      },
      401: {
        description: 'Unauthorized',
      },
      404: {
        description: 'Collection or tag not found',
      },
    },
  },
})
