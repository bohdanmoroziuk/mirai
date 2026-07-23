import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { runCommand } from 'citty'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileSystemError } from '#mirai/common/errors/fs'
import { ValidationError } from '#mirai/common/errors/validation'
import { logger } from '#mirai/common/utils/logger'
import { createLayerCommand } from './layer.command'

const runCreateLayerCommand = (rawArgs: string[]) => {
  return runCommand(createLayerCommand, { rawArgs })
}

describe.sequential('create layer command', () => {
  let temporaryDir: string
  let previousInitCwd: string | undefined

  beforeEach(async () => {
    temporaryDir = await mkdtemp(join(tmpdir(), 'mirai-cli-layer-command-'))
    previousInitCwd = process.env.INIT_CWD
    process.env.INIT_CWD = temporaryDir

    vi.spyOn(logger, 'success').mockImplementation(() => {})
    vi.spyOn(logger, 'info').mockImplementation(() => {})
  })

  afterEach(async () => {
    vi.restoreAllMocks()

    if (previousInitCwd === undefined) {
      delete process.env.INIT_CWD
    }
    else {
      process.env.INIT_CWD = previousInitCwd
    }

    await rm(temporaryDir, { recursive: true, force: true })
  })

  it('creates the expected layer directory and file structure', async () => {
    await runCreateLayerCommand(['admin', '--description', 'Administration features'])

    const layersDir = join(temporaryDir, 'layers')
    const layerDir = join(layersDir, 'admin')
    const nuxtConfigPath = join(layerDir, 'nuxt.config.ts')
    const nuxtConfig = await readFile(nuxtConfigPath, 'utf8')
    const layerStats = await stat(layerDir)
    const nuxtConfigStats = await stat(nuxtConfigPath)

    expect(layerStats.isDirectory()).toBe(true)
    expect(nuxtConfigStats.isFile()).toBe(true)
    await expect(readdir(temporaryDir)).resolves.toEqual(['layers'])
    await expect(readdir(layersDir)).resolves.toEqual(['admin'])
    await expect(readdir(layerDir)).resolves.toEqual(['nuxt.config.ts'])
    expect(nuxtConfig).toContain("name: 'admin'")
    expect(nuxtConfig).toContain("description: 'Administration features'")
    expect(logger.success).toHaveBeenCalledWith('Layer created: layers/admin/nuxt.config.ts')
    expect(logger.info).toHaveBeenCalledWith(
      'Next: register the layer in root nuxt.config.ts and add aliases manually.',
    )
  })

  it('does not replace an existing layer directory', async () => {
    const layerDir = join(temporaryDir, 'layers', 'admin')
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
    expect(logger.success).not.toHaveBeenCalled()
    expect(logger.info).not.toHaveBeenCalled()
  })

  it('rejects a file that occupies the layer path', async () => {
    const layersDir = join(temporaryDir, 'layers')
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
    expect(logger.success).not.toHaveBeenCalled()
    expect(logger.info).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateLayerCommand([])).rejects.toMatchObject({ code: 'EARG' })
    await expect(runCreateLayerCommand(['Admin'])).rejects.toBeInstanceOf(ValidationError)

    await expect(stat(join(temporaryDir, 'layers'))).rejects.toMatchObject({ code: 'ENOENT' })
    expect(logger.success).not.toHaveBeenCalled()
    expect(logger.info).not.toHaveBeenCalled()
  })
})
