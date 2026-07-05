import { mkdir, writeFile } from 'node:fs/promises'
import { join, relative, resolve } from 'pathe'
import { getCurrentDir } from '#mirai/common/utils/process'
import { createComponentTemplate } from './component.template'
import type { CreateComponentArgs, CreateComponentResult } from './component.types'

export const createComponent = async (args: CreateComponentArgs): Promise<CreateComponentResult> => {
  const currentDir = getCurrentDir()
  const componentName = args.name
  const componentFileName = args.name.concat('.vue')
  const componentDir = resolve(currentDir, 'app', 'components')
  const componentPath = join(componentDir, componentFileName)
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
    relativePath: relative(currentDir, componentPath),
  }
}
