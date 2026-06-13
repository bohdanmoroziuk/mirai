import type { EventHandler, EventHandlerRequest } from 'h3'
import type { ServerErrorReporter } from '@core/server/types/server-error'
import { createError, defineEventHandler, isError } from 'h3'

type DefineSafeEventHandler = {
  reportError?: ServerErrorReporter
}

export function defineSafeEventHandler<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
  options: DefineSafeEventHandler = {},
): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      return await handler(event)
    }
    catch (error) {
      if (isError(error)) {
        throw error
      }

      options.reportError?.(error, {
        method: event.method,
        url: event.path,
      })

      throw createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
      })
    }
  }) as EventHandler<T, D>
}
