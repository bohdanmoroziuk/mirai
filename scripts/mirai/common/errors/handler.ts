import { isValidationError, renderValidationError } from '#mirai/common/errors/validation'
import { isFileSystemError, renderFileSystemError } from '#mirai/common/errors/fs'
import { isNodeError, renderNodeError } from '#mirai/common/errors/node'
import { getErrorMessage } from '#mirai/common/utils/error'
import { logger } from '#mirai/common/utils/logger'

export const handleError = (error: unknown) => {
  if (isValidationError(error)) {
    renderValidationError(error)
    return
  }

  if (isFileSystemError(error)) {
    renderFileSystemError(error)
    return
  }

  if (isNodeError(error)) {
    renderNodeError(error)
    return
  }

  logger.error(getErrorMessage(error))
}
