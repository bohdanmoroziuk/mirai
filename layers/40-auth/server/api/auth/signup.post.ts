import { HttpStatus } from '@core/shared/constants/http'
import { createResponse } from '@core/server/utils/response'
import { signupBodySchema } from '../../schemas/auth.schema'
import { signupUser } from '../../services/auth.service'

export default defineSafeEventHandler(async (event) => {
  const body = await validateBody(event, signupBodySchema)
  const user = await signupUser(body)

  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  })

  setResponseStatus(event, HttpStatus.CREATED)

  return createResponse(user)
})

defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Sign up',
    description: 'Creates a new user account.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              name: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'john@example.com',
              },
              password: {
                type: 'string',
                format: 'password',
                example: 'password123',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'User signed up successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'object',
                  required: ['id', 'name', 'email', 'avatarUrl'],
                  properties: {
                    id: {
                      type: 'string',
                      example: '665f1b8e1b7c2f0012a4c123',
                    },
                    name: {
                      type: 'string',
                      example: 'John Doe',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john@example.com',
                    },
                    avatarUrl: {
                      type: 'string',
                      nullable: true,
                      example: null,
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
      409: {
        description: 'User with this email already exists',
      },
      500: {
        description: 'Internal server error',
      },
    },
  },
})
