import type { ServerErrorContext } from '@core/server/types/server-error'

export const reportServerError = (
  error: unknown,
  context: ServerErrorContext = {},
) => {
  if (import.meta.dev) {
    console.error('[Server error]', {
      context,
      error,
    })
  }

  // Later send it to Sentry, Logtail, Axiom, etc.
}
