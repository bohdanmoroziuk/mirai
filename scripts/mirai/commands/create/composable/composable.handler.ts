import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'pathe'
import { ensureLayerDirExists } from '#mirai/common/utils/guards'
import { resolveComposablePath, resolveRelativePath } from '#mirai/common/utils/fs'
import { createComposableTemplate } from './composable.template'
import type { CreateComposableArgs, CreateComposableResult } from './composable.types'

export const createComposable = async (args: CreateComposableArgs): Promise<CreateComposableResult> => {
  const layerName = args.layer

  if (layerName) {
    await ensureLayerDirExists(layerName)
  }

  const composableName = args.name
  const composablePath = resolveComposablePath(composableName, layerName)
  const composableDir = dirname(composablePath)
  const composableTemplate = createComposableTemplate(composableName)

  await mkdir(
    composableDir,
    {
      recursive: true,
    },
  )

  await writeFile(
    composablePath,
    composableTemplate,
    {
      encoding: 'utf8',
      flag: 'wx',
    },
  )

  return {
    relativePath: resolveRelativePath(composablePath),
  }
}
