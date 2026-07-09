import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'pathe'
import { ensureLayerDirDoesNotExist } from '#mirai/common/utils/guards'
import { resolveLayerNuxtConfigPath, resolveRelativePath } from '#mirai/common/utils/fs'
import { createNuxtConfigTemplate } from './layer.template'
import type { CreateLayerArgs, CreateLayerResult } from './layer.types'

export const createLayer = async (args: CreateLayerArgs): Promise<CreateLayerResult> => {
  const layerName = args.name

  await ensureLayerDirDoesNotExist(layerName)

  const layerDescription = args.description
  const layerNuxtConfigPath = resolveLayerNuxtConfigPath(layerName)
  const layerDir = dirname(layerNuxtConfigPath)
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
    relativePath: resolveRelativePath(layerNuxtConfigPath),
  }
}
