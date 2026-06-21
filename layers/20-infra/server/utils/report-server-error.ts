import type { ServerErrorContext } from '@core/server/types/server-error'
import { serverLogger } from '../../shared/services/logger.service'

export const reportServerError = (
  error: unknown,
  context: ServerErrorContext = {},
) => {
  if (import.meta.dev) {
    serverLogger.error('Error', {
      context,
      error,
    })
  }

  // Later send it to Sentry, Logtail, Axiom, etc.
}
