export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }

  return String(error)
}

export type NodeError = NodeJS.ErrnoException

export const NodeErrorCode = {
  PATH_NOT_FOUND: 'ENOENT',
} as const

export type NodeErrorCode = (typeof NodeErrorCode)[keyof typeof NodeErrorCode]

export const isNodeError = (error: unknown): error is NodeError => {
  return error instanceof Error && 'code' in error
}

export const isNodeErrorCode = (error: unknown, code: NodeErrorCode) => {
  return isNodeError(error) && error.code === code
}

export const isPathNotFoundError = (error: unknown) => {
  return isNodeErrorCode(error, NodeErrorCode.PATH_NOT_FOUND)
}
