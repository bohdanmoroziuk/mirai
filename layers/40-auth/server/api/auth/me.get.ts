defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Get current user',
    description: 'Returns the current session user if the user is authenticated, otherwise returns null.',
    responses: {
      200: {
        description: 'Current user returned successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'object',
                  nullable: true,
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
            examples: {
              authenticated: {
                summary: 'Authenticated user',
                value: {
                  data: {
                    id: '665f1b8e1b7c2f0012a4c123',
                    name: 'John Doe',
                    email: 'john@example.com',
                    avatarUrl: null,
                  },
                },
              },
              guest: {
                summary: 'Guest user',
                value: {
                  data: null,
                },
              },
            },
          },
        },
      },
    },
  },
})

export default defineSafeEventHandler(async (event) => {
  const session = await getUserSession(event)

  return createResponse(session.user ?? null)
}, {
  reportError: reportServerError,
})
