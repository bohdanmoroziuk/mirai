import { createError, defineEventHandler, isError } from 'h3'
import type { EventHandler, EventHandlerRequest } from 'h3'
import { HttpStatus } from '@core/shared/constants/http'
import { reportServerError } from './report-server-error'

export function defineSafeEventHandler<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, D> {
  return defineEventHandler<T>(async (event) => {
    try {
      return await handler(event)
    }
    catch (error) {
      if (isError(error)) {
        throw error
      }

      reportServerError(error, {
        method: event.method,
        url: event.path,
      })

      throw createError({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        statusMessage: 'Internal Server Error',
      })
    }
  }) as EventHandler<T, D>
}
