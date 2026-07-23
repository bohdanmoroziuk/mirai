import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { runCommand } from 'citty'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileSystemError } from '#mirai/common/errors/fs'
import { NodeErrorCode } from '#mirai/common/errors/node'
import { ValidationError } from '#mirai/common/errors/validation'
import { CittyErrorCode } from '#mirai/test/constants/citty'
import { expectPathMissing } from '#mirai/test/utils/assertions'
import { createCliLoggerSpies } from '#mirai/test/utils/logger'
import { createTemporaryCliProject } from '#mirai/test/utils/temporary-project'
import { createComposableCommand } from './composable.command'

const runCreateComposableCommand = (rawArgs: string[]) => {
  return runCommand(createComposableCommand, { rawArgs })
}

describe.sequential('create composable command', () => {
  const project = createTemporaryCliProject('composable-command')
  let loggerSpies: ReturnType<typeof createCliLoggerSpies>

  beforeEach(async () => {
    await project.setup()
    loggerSpies = createCliLoggerSpies()
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    await project.cleanup()
  })

  it('creates a composable in the project root', async () => {
    await runCreateComposableCommand(['useNotification'])

    const composablePath = join(project.root, 'app', 'composables', 'useNotification.ts')
    const composable = await readFile(composablePath, 'utf8')

    expect(composable).toContain('export const useNotification')
    expect(loggerSpies.success).toHaveBeenCalledWith('Composable created: app/composables/useNotification.ts')
  })

  it('creates a composable inside an existing layer', async () => {
    await mkdir(join(project.root, 'layers', 'admin'), { recursive: true })

    await runCreateComposableCommand(['useNotification', '--layer', 'admin'])

    const composablePath = join(project.root, 'layers', 'admin', 'app', 'composables', 'useNotification.ts')
    const composable = await readFile(composablePath, 'utf8')

    expect(composable).toContain('export const useNotification')
    expect(loggerSpies.success).toHaveBeenCalledWith(
      'Composable created: layers/admin/app/composables/useNotification.ts',
    )
  })

  it('does not overwrite an existing composable', async () => {
    const composablePath = join(project.root, 'app', 'composables', 'useNotification.ts')
    const existingComposable = 'export const useNotification = () => "existing"'

    await mkdir(join(project.root, 'app', 'composables'), { recursive: true })
    await writeFile(composablePath, existingComposable, 'utf8')

    await expect(runCreateComposableCommand(['useNotification'])).rejects.toMatchObject({
      code: NodeErrorCode.PATH_ALREADY_EXISTS,
    })

    await expect(readFile(composablePath, 'utf8')).resolves.toBe(existingComposable)
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })

  it('rejects a composable for a missing layer without creating directories', async () => {
    await expect(runCreateComposableCommand(['useNotification', '--layer', 'admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: join(project.root, 'layers', 'admin'),
    })

    await expectPathMissing(join(project.root, 'app'))
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateComposableCommand([])).rejects.toMatchObject({ code: CittyErrorCode.ARGUMENT })
    await expect(runCreateComposableCommand(['notification'])).rejects.toBeInstanceOf(ValidationError)
    await expect(
      runCreateComposableCommand(['useNotification', '--layer', 'Admin']),
    ).rejects.toBeInstanceOf(ValidationError)

    await expectPathMissing(join(project.root, 'app'))
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })
})
