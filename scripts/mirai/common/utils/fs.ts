import { stat } from 'node:fs/promises'
import { resolve } from 'pathe'
import { getCurrentDir } from '#mirai/common/utils/process'
import { isPathNotFoundError } from '#mirai/common/utils/error'

export const PathStatus = {
  FILE: 'file',
  DIRECTORY: 'directory',
  MISSING: 'missing',
  OTHER: 'other',
} as const

export type PathStatus = (typeof PathStatus)[keyof typeof PathStatus]

export const getPathStatus = async (path: string): Promise<PathStatus> => {
  try {
    const stats = await stat(path)

    if (stats.isFile()) {
      return PathStatus.FILE
    }

    if (stats.isDirectory()) {
      return PathStatus.DIRECTORY
    }

    return PathStatus.OTHER
  }
  catch (error) {
    if (isPathNotFoundError(error)) {
      return PathStatus.MISSING
    }

    throw error
  }
}

export const fileExists = async (path: string) => {
  return (await getPathStatus(path)) === PathStatus.FILE
}

export const dirExists = async (path: string) => {
  return (await getPathStatus(path)) === PathStatus.DIRECTORY
}

export const pathExists = async (path: string) => {
  return (await getPathStatus(path)) !== PathStatus.MISSING
}

export const resolveLayerPath = (name: string) => {
  return resolve(getCurrentDir(), 'layers', name)
}
