import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { runCommand } from 'citty'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileSystemError } from '#mirai/common/errors/fs'
import { ValidationError } from '#mirai/common/errors/validation'
import { logger } from '#mirai/common/utils/logger'
import { createComposableCommand } from './composable.command'

const runCreateComposableCommand = (rawArgs: string[]) => {
  return runCommand(createComposableCommand, { rawArgs })
}

describe.sequential('create composable command', () => {
  let temporaryDir: string
  let previousInitCwd: string | undefined

  beforeEach(async () => {
    temporaryDir = await mkdtemp(join(tmpdir(), 'mirai-cli-composable-command-'))
    previousInitCwd = process.env.INIT_CWD
    process.env.INIT_CWD = temporaryDir

    vi.spyOn(logger, 'success').mockImplementation(() => {})
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

  it('creates a composable in the project root', async () => {
    await runCreateComposableCommand(['useNotification'])

    const composablePath = join(temporaryDir, 'app', 'composables', 'useNotification.ts')
    const composable = await readFile(composablePath, 'utf8')

    expect(composable).toContain('export const useNotification')
    expect(logger.success).toHaveBeenCalledWith('Composable created: app/composables/useNotification.ts')
  })

  it('creates a composable inside an existing layer', async () => {
    await mkdir(join(temporaryDir, 'layers', 'admin'), { recursive: true })

    await runCreateComposableCommand(['useNotification', '--layer', 'admin'])

    const composablePath = join(temporaryDir, 'layers', 'admin', 'app', 'composables', 'useNotification.ts')
    const composable = await readFile(composablePath, 'utf8')

    expect(composable).toContain('export const useNotification')
    expect(logger.success).toHaveBeenCalledWith(
      'Composable created: layers/admin/app/composables/useNotification.ts',
    )
  })

  it('does not overwrite an existing composable', async () => {
    const composablePath = join(temporaryDir, 'app', 'composables', 'useNotification.ts')
    const existingComposable = 'export const useNotification = () => "existing"'

    await mkdir(join(temporaryDir, 'app', 'composables'), { recursive: true })
    await writeFile(composablePath, existingComposable, 'utf8')

    await expect(runCreateComposableCommand(['useNotification'])).rejects.toMatchObject({
      code: 'EEXIST',
    })

    await expect(readFile(composablePath, 'utf8')).resolves.toBe(existingComposable)
    expect(logger.success).not.toHaveBeenCalled()
  })

  it('rejects a composable for a missing layer without creating directories', async () => {
    await expect(runCreateComposableCommand(['useNotification', '--layer', 'admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: join(temporaryDir, 'layers', 'admin'),
    })

    await expect(stat(join(temporaryDir, 'app'))).rejects.toMatchObject({ code: 'ENOENT' })
    expect(logger.success).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateComposableCommand([])).rejects.toMatchObject({ code: 'EARG' })
    await expect(runCreateComposableCommand(['notification'])).rejects.toBeInstanceOf(ValidationError)
    await expect(
      runCreateComposableCommand(['useNotification', '--layer', 'Admin']),
    ).rejects.toBeInstanceOf(ValidationError)

    await expect(stat(join(temporaryDir, 'app'))).rejects.toMatchObject({ code: 'ENOENT' })
    expect(logger.success).not.toHaveBeenCalled()
  })
})
