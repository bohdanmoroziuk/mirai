import { mkdir, writeFile } from 'node:fs/promises'
import { dirname } from 'pathe'
import { ensureLayerDirExists } from '#mirai/common/utils/guards'
import { resolveComponentPath, resolveRelativePath } from '#mirai/common/utils/fs'
import { createComponentTemplate } from './component.template'
import type { CreateComponentArgs, CreateComponentResult } from './component.types'

export const createComponent = async (args: CreateComponentArgs): Promise<CreateComponentResult> => {
  const layerName = args.layer

  if (layerName) {
    await ensureLayerDirExists(layerName)
  }

  const componentName = args.name
  const componentPath = resolveComponentPath(componentName, layerName)
  const componentDir = dirname(componentPath)
  const componentTemplate = createComponentTemplate(componentName)

  await mkdir(
    componentDir,
    {
      recursive: true,
    },
  )

  await writeFile(
    componentPath,
    componentTemplate,
    {
      encoding: 'utf8',
      flag: 'wx',
    },
  )

  return {
    relativePath: resolveRelativePath(componentPath),
  }
}
