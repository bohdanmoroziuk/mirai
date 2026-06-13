import { defineSafeEventHandler } from '@core/server/utils/define-safe-event-handler'
import { reportServerError } from '@infra/server/utils/report-server-error'

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
              required: ['status'],
              properties: {
                status: {
                  type: 'string',
                  example: 'ok',
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
  return {
    status: 'ok',
  }
}, {
  reportError: reportServerError,
})
