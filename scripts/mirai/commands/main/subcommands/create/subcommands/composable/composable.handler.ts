import { mkdir, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'pathe'
import { getCurrentDir } from '#mirai/common/utils/process'
import { ensureLayerDirExists } from '#mirai/common/utils/guards'
import { createComposableTemplate } from './composable.template'
import type { CreateComposableArgs, CreateComposableResult } from './composable.types'

export const createComposable = async (args: CreateComposableArgs): Promise<CreateComposableResult> => {
  const layerName = args.layer

  if (layerName) {
    await ensureLayerDirExists(layerName)
  }

  const currentDir = getCurrentDir()
  const composableName = args.name
  const composableFileName = args.name.concat('.ts')
  const composableDir = layerName
    ? resolve(currentDir, 'layers', layerName, 'app', 'composables')
    : resolve(currentDir, 'app', 'composables')
  const composablePath = join(composableDir, composableFileName)
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
    relativePath: relative(currentDir, composablePath),
  }
}
