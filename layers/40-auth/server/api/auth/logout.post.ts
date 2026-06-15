defineRouteMeta({
  openAPI: {
    tags: ['Auth'],
    summary: 'Log out',
    description: 'Clears the current user session if it exists.',
    responses: {
      200: {
        description: 'User logged out successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['data'],
              properties: {
                data: {
                  type: 'object',
                  required: ['success'],
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
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

export default defineSafeEventHandler(async (event) => {
  await clearUserSession(event)

  return createResponse({ success: true })
})
