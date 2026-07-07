import { isDefined } from '#mirai/common/utils/common'
import { isError } from '#mirai/common/utils/error'
import { logger } from '#mirai/common/utils/logger'

export type FileSystemAction
  = | 'check'
    | 'create'
    | 'read'
    | 'write'
    | 'delete'

export type FileSystemErrorOptions = {
  path?: string
  action: FileSystemAction
  cause?: unknown
}

export class FileSystemError extends Error {
  readonly path?: string
  readonly action: FileSystemAction
  readonly cause?: unknown

  constructor(
    message: string,
    options: FileSystemErrorOptions,
  ) {
    super(message)

    this.name = this.constructor.name
    this.path = options.path
    this.action = options.action
    this.cause = options.cause

    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export const isFileSystemError = (error: unknown): error is FileSystemError => {
  return error instanceof FileSystemError
}

export const renderFileSystemError = (error: FileSystemError) => {
  const lines = [
    `${error.name}: ${error.message}`,
    `- Action: ${error.action}`,
  ]

  if (isDefined(error.path)) {
    lines.push(`- Path: ${error.path}`)
  }

  if (isError(error.cause)) {
    lines.push(`- Cause: ${error.cause.message}`)
  }

  logger.error(lines.join('\n'))
}
