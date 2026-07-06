import { resolve } from 'node:path'
import { getCurrentDir } from '#mirai/common/utils/process'
import { fileExists, dirExists } from '#mirai/common/utils/fs'

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
    throw new Error('The Mirai CLI must be called from the project root directory.')
  }
}
