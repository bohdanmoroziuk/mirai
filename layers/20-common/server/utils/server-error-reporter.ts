import { serverLogger } from '../../shared/services/logger.service'

export type ServerErrorContext = {
  method?: string
  url?: string
  statusCode?: number
  userId?: string
}

export type ServerErrorReporter = (
  error: unknown,
  context?: ServerErrorContext,
) => void

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
