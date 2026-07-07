import { isDefined } from '#mirai/common/utils/common'
import { isError } from '#mirai/common/utils/error'
import { logger } from '#mirai/common/utils/logger'

export type NodeError = NodeJS.ErrnoException

export const NodeErrorCode = {
  PATH_NOT_FOUND: 'ENOENT',
  PATH_ALREADY_EXISTS: 'EEXIST',
  ACCESS_DENIED: 'EACCES',
  OPERATION_NOT_PERMITTED: 'EPERM',
  PATH_NOT_DIRECTORY: 'ENOTDIR',
  PATH_IS_DIRECTORY: 'EISDIR',
  DIRECTORY_NOT_EMPTY: 'ENOTEMPTY',
} as const

export type NodeErrorCode = (typeof NodeErrorCode)[keyof typeof NodeErrorCode]

export const isNodeError = (error: unknown): error is NodeError => {
  return isError(error) && 'code' in error
}

export const isNodeErrorCode = (error: unknown, code: NodeErrorCode) => {
  return isNodeError(error) && error.code === code
}

export const isPathNotFoundError = (error: unknown) => {
  return isNodeErrorCode(error, NodeErrorCode.PATH_NOT_FOUND)
}

export const getNodeErrorMessage = (error: NodeError): string | undefined => {
  switch (error.code) {
    case NodeErrorCode.PATH_NOT_FOUND:
      return 'The file or directory does not exist.'
    case NodeErrorCode.PATH_ALREADY_EXISTS:
      return 'The file or directory already exists.'
    case NodeErrorCode.ACCESS_DENIED:
    case NodeErrorCode.OPERATION_NOT_PERMITTED:
      return 'Permission denied.'
    case NodeErrorCode.PATH_NOT_DIRECTORY:
      return 'A part of the path is not a directory.'
    case NodeErrorCode.PATH_IS_DIRECTORY:
      return 'Expected a file, but received a directory.'
    default:
      return undefined
  }
}

export const renderNodeError = (error: NodeError) => {
  const lines = [
    `${error.name}: ${error.message}`,
  ]

  if (isDefined(error.path)) {
    lines.push(`- Path: ${error.path}`)
  }

  if (isNodeError(error.cause)) {
    lines.push(`- Code: ${error.cause.code}`)

    const hint = getNodeErrorMessage(error.cause)

    if (isDefined(hint)) {
      lines.push(`- Hint: ${hint}`)
    }
  }

  logger.error(lines.join('\n'))
}
