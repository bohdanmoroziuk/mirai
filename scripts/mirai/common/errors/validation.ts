import type { ZodError } from 'zod'
import { logger } from '#mirai/common/utils/logger'

export type ValidationErrorDetail = {
  path?: string
  message: string
}

export class ValidationError extends Error {
  readonly details: ValidationErrorDetail[]

  constructor(
    message: string,
    details: ValidationErrorDetail[] = [],
  ) {
    super(message)

    this.name = this.constructor.name
    this.details = details

    Object.setPrototypeOf(this, new.target.prototype)
  }

  static fromZodError(
    message: string,
    error: ZodError,
  ) {
    return new ValidationError(
      message,
      error.issues.map((issue) => {
        return {
          path: issue.path.length
            ? issue.path.join('.')
            : undefined,
          message: issue.message,
        }
      }),
    )
  }

  get hasDetails() {
    return this.details.length > 0
  }
}

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError
}

export const renderValidationError = (error: ValidationError) => {
  const lines = [`${error.name}: ${error.message}`]

  if (error.hasDetails) {
    lines.push('Details:')

    for (const detail of error.details) {
      lines.push(`- ${detail.path ?? 'args'}: ${detail.message}`)
    }
  }

  logger.error(lines.join('\n'))
}
