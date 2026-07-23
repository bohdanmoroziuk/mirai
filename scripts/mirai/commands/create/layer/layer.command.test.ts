import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import { runCommand } from 'citty'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileSystemError } from '#mirai/common/errors/fs'
import { ValidationError } from '#mirai/common/errors/validation'
import { CittyErrorCode } from '#mirai/test/constants/citty'
import { expectPathMissing } from '#mirai/test/utils/assertions'
import { createCliLoggerSpies } from '#mirai/test/utils/logger'
import { createTemporaryCliProject } from '#mirai/test/utils/temporary-project'
import { createLayerCommand } from './layer.command'

const runCreateLayerCommand = (rawArgs: string[]) => {
  return runCommand(createLayerCommand, { rawArgs })
}

describe.sequential('create layer command', () => {
  const project = createTemporaryCliProject('layer-command')
  let loggerSpies: ReturnType<typeof createCliLoggerSpies>

  beforeEach(async () => {
    await project.setup()
    loggerSpies = createCliLoggerSpies()
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    await project.cleanup()
  })

  it('creates the expected layer directory and file structure', async () => {
    await runCreateLayerCommand(['admin', '--description', 'Administration features'])

    const layersDir = join(project.root, 'layers')
    const layerDir = join(layersDir, 'admin')
    const nuxtConfigPath = join(layerDir, 'nuxt.config.ts')
    const nuxtConfig = await readFile(nuxtConfigPath, 'utf8')
    const layerStats = await stat(layerDir)
    const nuxtConfigStats = await stat(nuxtConfigPath)

    expect(layerStats.isDirectory()).toBe(true)
    expect(nuxtConfigStats.isFile()).toBe(true)
    await expect(readdir(project.root)).resolves.toEqual(['layers'])
    await expect(readdir(layersDir)).resolves.toEqual(['admin'])
    await expect(readdir(layerDir)).resolves.toEqual(['nuxt.config.ts'])
    expect(nuxtConfig).toContain("name: 'admin'")
    expect(nuxtConfig).toContain("description: 'Administration features'")
    expect(loggerSpies.success).toHaveBeenCalledWith('Layer created: layers/admin/nuxt.config.ts')
    expect(loggerSpies.info).toHaveBeenCalledWith(
      'Next: register the layer in root nuxt.config.ts and add aliases manually.',
    )
  })

  it('does not replace an existing layer directory', async () => {
    const layerDir = join(project.root, 'layers', 'admin')
    const existingFilePath = join(layerDir, 'existing.txt')
    const existingFile = 'existing layer content'

    await mkdir(layerDir, { recursive: true })
    await writeFile(existingFilePath, existingFile, 'utf8')

    await expect(runCreateLayerCommand(['admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: layerDir,
    })

    await expect(readFile(existingFilePath, 'utf8')).resolves.toBe(existingFile)
    expect(loggerSpies.success).not.toHaveBeenCalled()
    expect(loggerSpies.info).not.toHaveBeenCalled()
  })

  it('rejects a file that occupies the layer path', async () => {
    const layersDir = join(project.root, 'layers')
    const layerPath = join(layersDir, 'admin')
    const existingFile = 'not a directory'

    await mkdir(layersDir, { recursive: true })
    await writeFile(layerPath, existingFile, 'utf8')

    await expect(runCreateLayerCommand(['admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: layerPath,
    })

    await expect(readFile(layerPath, 'utf8')).resolves.toBe(existingFile)
    expect(loggerSpies.success).not.toHaveBeenCalled()
    expect(loggerSpies.info).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateLayerCommand([])).rejects.toMatchObject({ code: CittyErrorCode.ARGUMENT })
    await expect(runCreateLayerCommand(['Admin'])).rejects.toBeInstanceOf(ValidationError)

    await expectPathMissing(join(project.root, 'layers'))
    expect(loggerSpies.success).not.toHaveBeenCalled()
    expect(loggerSpies.info).not.toHaveBeenCalled()
  })
})
