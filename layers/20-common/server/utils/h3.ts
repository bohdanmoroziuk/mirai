import { createError, defineEventHandler, isError } from 'h3'
import type { EventHandler, EventHandlerRequest } from 'h3'
import { HttpStatus } from '@core/shared/constants/http'
import { toApiResponse } from '@core/shared/utils/api'
import { reportServerError } from './server-error-reporter'

export function defineApiRouteHandler<T extends EventHandlerRequest, D>(
  handler: EventHandler<T, D>,
): EventHandler<T, ApiResponse<Awaited<D>>> {
  return defineEventHandler<T>(async (event) => {
    try {
      return toApiResponse(await handler(event))
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
  }) as EventHandler<T, ApiResponse<Awaited<D>>>
}
