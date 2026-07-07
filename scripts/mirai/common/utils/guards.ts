import { resolve } from 'pathe'
import { getCurrentDir } from '#mirai/common/utils/process'
import { getPathStatus, fileExists, dirExists, resolveLayerPath, PathStatus } from '#mirai/common/utils/fs'
import { FileSystemError } from '#mirai/common/errors/fs'

type ProjectRootPathRequirement = {
  path: string
  check: (path: string) => Promise<boolean>
}

const projectRootPathRequirements: ProjectRootPathRequirement[] = [
  { path: 'package.json', check: fileExists },
  { path: 'nuxt.config.ts', check: fileExists },
  { path: 'app', check: dirExists },
  { path: 'layers', check: dirExists },
]

export const ensureProjectRoot = async (): Promise<void> => {
  const currentDir = getCurrentDir()

  const pathStatuses = await Promise.all(
    projectRootPathRequirements.map(({ path, check }) => {
      return check(resolve(currentDir, path))
    }),
  )

  const hasMissingPath = pathStatuses.some(exists => !exists)

  if (hasMissingPath) {
    throw new FileSystemError(
      'The Mirai CLI must be called from the project root directory.',
      {
        action: 'check',
      },
    )
  }
}

export const ensureLayerDirExists = async (name: string) => {
  const path = resolveLayerPath(name)
  const status = await getPathStatus(path)

  switch (status) {
    case PathStatus.DIRECTORY:
      return
    case PathStatus.FILE:
    case PathStatus.OTHER:
      throw new FileSystemError(
        `Layer "${name}" exists, but it is not a directory.`,
        {
          action: 'check',
          path,
        },
      )
    case PathStatus.MISSING:
    default:
      throw new FileSystemError(
        `Layer "${name}" does not exist.`,
        {
          action: 'check',
          path,
        },
      )
  }
}

export const ensureLayerDirDoesNotExist = async (name: string) => {
  const path = resolveLayerPath(name)
  const status = await getPathStatus(path)

  switch (status) {
    case PathStatus.MISSING:
      return
    case PathStatus.DIRECTORY:
      throw new FileSystemError(
        `Layer "${name}" already exists.`,
        {
          action: 'check',
          path,
        },
      )
    case PathStatus.FILE:
    case PathStatus.OTHER:
    default:
      throw new FileSystemError(
        `Layer "${name}" exists, but it is not a directory.`,
        {
          action: 'check',
          path,
        },
      )
  }
}
