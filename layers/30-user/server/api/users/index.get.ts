import { getUsers } from '../../services/user.service'

defineRouteMeta({
  openAPI: {
    tags: ['Users'],
    summary: 'Get users',
    description: 'Returns a list of users.',
    responses: {
      200: {
        description: 'Users returned successfully',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'object',
                required: ['id', 'email', 'name', 'createdAt', 'updatedAt'],
                properties: {
                  id: {
                    type: 'string',
                    example: '665f1b8e1b7c2f0012a4c123',
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                    example: 'user@example.com',
                  },
                  name: {
                    type: 'string',
                    example: 'John Doe',
                  },
                  createdAt: {
                    type: 'string',
                    format: 'date-time',
                  },
                  updatedAt: {
                    type: 'string',
                    format: 'date-time',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export default defineSafeEventHandler(() => {
  return getUsers()
})
