import { HttpStatus } from '@core/shared/constants/http'
import { requireUserId } from '@common/server/utils/auth'
import { createTagBodySchema } from '../../schemas/create-tag.schema'
import { toCreateTagInput } from '../../mappers/create-tag.mapper'
import { createTag } from '../../tag.container'

export default defineSafeEventHandler(async (event) => {
  const userId = await requireUserId(event)
  const body = await validateBody(event, createTagBodySchema)
  const tag = await createTag(toCreateTagInput(userId, body))

  setResponseStatus(event, HttpStatus.CREATED)

  return createResponse(tag)
})

defineRouteMeta({
  openAPI: {
    tags: ['Tags'],
    summary: 'Create tag',
    description: 'Creates a new tag for the authenticated user.',
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
            required: ['name', 'color'],
            properties: {
              name: {
                type: 'string',
                example: 'Important',
              },
              color: {
                type: 'string',
                example: '#F59E0B',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Tag created successfully',
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
                    'name',
                    'color',
                    'userId',
                    'createdAt',
                    'updatedAt',
                  ],
                  properties: {
                    id: {
                      type: 'string',
                      example: '665f1b8e1b7c2f0012a4c123',
                    },
                    name: {
                      type: 'string',
                      example: 'Important',
                    },
                    color: {
                      type: 'string',
                      example: '#F59E0B',
                    },
                    userId: {
                      type: 'string',
                      example: '665f1b8e1b7c2f0012a4c999',
                    },
                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-06-17T10:30:00.000Z',
                    },
                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-06-17T10:30:00.000Z',
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
      409: {
        description: 'Tag with this name already exists',
      },
    },
  },
})
