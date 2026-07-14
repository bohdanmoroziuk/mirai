export default defineSafeEventHandler(() => {
  return createResponse({
    success: true,
  })
})

defineRouteMeta({
  openAPI: {
    tags: ['Health'],
    summary: 'Check API health',
    description: 'Returns the current health status of the API.',
    responses: {
      200: {
        description: 'API is healthy',
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
