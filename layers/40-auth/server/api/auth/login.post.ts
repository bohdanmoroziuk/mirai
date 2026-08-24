import { loginUserBodySchema } from '../../schemas/login-user.schema'
import { toLoginUserInput } from '../../mappers/login-user.mapper'
import { loginUser } from '../../auth.container'

export default defineApiRouteHandler(async (event) => {
  const body = await validateBody(event, loginUserBodySchema)
  const user = await loginUser(toLoginUserInput(body))

  await setUserSession(event, {
    user,
    loggedInAt: new Date(),
  })

  return user
})

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
                  required: ['id', 'name', 'email', 'avatarUrl'],
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
