import { loginBodySchema } from '@auth/server/schemas/auth.schema'
import { loginUser } from '@auth/server/services/auth.service'

defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Login user',
    description: 'Authenticates a user and creates a session.',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
              email: {
                type: 'string',
                format: 'email',
                example: 'john.doe@example.com',
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
      200: {
        description: 'User logged in successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'object',
                  required: ['id', 'name', 'email'],
                  properties: {
                    id: {
                      type: 'string',
                      example: '665f1f77bcf86cd799439011',
                    },
                    name: {
                      type: 'string',
                      example: 'John Doe',
                    },
                    email: {
                      type: 'string',
                      format: 'email',
                      example: 'john.doe@example.com',
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
      401: {
        description: 'Invalid email or password',
      },
      500: {
        description: 'Internal server error',
      },
    },
  },
})

export default defineSafeEventHandler(async (event) => {
  const body = await validateBody(event, loginBodySchema)
  const user = await loginUser(body)

  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  })

  return createResponse(user)
}, {
  reportError: reportServerError,
})
