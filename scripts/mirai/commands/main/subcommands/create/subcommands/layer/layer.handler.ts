import { mkdir, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'pathe'
import { getCurrentDir } from '#mirai/common/utils/process'
import { ensureLayerDirDoesNotExist } from '#mirai/common/utils/guards'
import { createNuxtConfigTemplate } from './layer.template'
import type { CreateLayerArgs, CreateLayerResult } from './layer.types'

export const createLayer = async (args: CreateLayerArgs): Promise<CreateLayerResult> => {
  const layerName = args.name

  await ensureLayerDirDoesNotExist(layerName)

  const currentDir = getCurrentDir()
  const layerDescription = args.description
  const layerDir = resolve(currentDir, 'layers', layerName)

  const layerNuxtConfigPath = join(layerDir, 'nuxt.config.ts')
  const layerNuxtConfigTemplate = createNuxtConfigTemplate(layerName, layerDescription)

  await mkdir(
    layerDir,
    {
      recursive: true,
    },
  )

  await writeFile(
    layerNuxtConfigPath,
    layerNuxtConfigTemplate,
    {
      encoding: 'utf8',
      flag: 'wx',
    },
  )

  return {
    relativePath: relative(currentDir, layerNuxtConfigPath),
  }
}
