import { requireUserId } from '@common/server/utils/auth'
import { tagParamsSchema } from '../../../schemas/tag-params.schema'
import { updateTagBodySchema } from '../../../schemas/update-tag.schema'
import { toUpdateTagInput } from '../../../mappers/update-tag.mapper'
import { updateTag } from '../../../tag.container'

export default defineApiRouteHandler(async (event) => {
  const userId = await requireUserId(event)
  const params = await validateParams(event, tagParamsSchema)
  const body = await validateBody(event, updateTagBodySchema)
  const tag = await updateTag(toUpdateTagInput(userId, params, body))

  return tag
})

defineRouteMeta({
  openAPI: {
    tags: ['Tags'],
    summary: 'Update tag',
    description: 'Updates a tag that belongs to the authenticated user or throws a 404 error if the tag does not exist.',
    security: [
      {
        cookieAuth: [],
      },
    ],
    parameters: [
      {
        name: 'tagId',
        in: 'path',
        required: true,
        description: 'Tag ID.',
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
            description: 'At least one field must be provided.',
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
      200: {
        description: 'Tag updated successfully',
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
                      example: '2026-06-17T10:45:00.000Z',
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
        description: 'Tag not found',
      },
      409: {
        description: 'Tag with this name already exists',
      },
    },
  },
})
