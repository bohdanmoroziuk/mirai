import { createTagBodySchema } from '@tag/server/schemas/tag.schema'
import { createTag } from '@tag/server/services/tag.service'

export default defineSafeEventHandler(async (event) => {
  const session = await requireUserSession(event)
  const body = await validateBody(event, createTagBodySchema)
  const tag = await createTag({
    userId: session.user.id,
    name: body.name,
    color: body.color,
  })

  setResponseStatus(event, 201)

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
            required: ['name'],
            properties: {
              name: {
                type: 'string',
                example: 'Important',
              },
              color: {
                type: 'string',
                nullable: true,
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
                      nullable: true,
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
