import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { runCommand } from 'citty'
import { join } from 'pathe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { FileSystemError } from '#mirai/common/errors/fs'
import { ValidationError } from '#mirai/common/errors/validation'
import { logger } from '#mirai/common/utils/logger'
import { createComponentCommand } from './component.command'

const runCreateComponentCommand = (rawArgs: string[]) => {
  return runCommand(createComponentCommand, { rawArgs })
}

describe.sequential('create component command', () => {
  let temporaryDir: string
  let previousInitCwd: string | undefined

  beforeEach(async () => {
    temporaryDir = await mkdtemp(join(tmpdir(), 'mirai-cli-component-command-'))
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

  it('creates a component in the project root', async () => {
    await runCreateComponentCommand(['UserTable'])

    const componentPath = join(temporaryDir, 'app', 'components', 'UserTable.vue')
    const component = await readFile(componentPath, 'utf8')

    expect(component).toContain('<script setup lang="ts">')
    expect(component).toContain('UserTable')
    expect(logger.success).toHaveBeenCalledWith('Component created: app/components/UserTable.vue')
  })

  it('creates a component inside an existing layer', async () => {
    await mkdir(join(temporaryDir, 'layers', 'admin'), { recursive: true })

    await runCreateComponentCommand(['UserTable', '--layer', 'admin'])

    const componentPath = join(temporaryDir, 'layers', 'admin', 'app', 'components', 'UserTable.vue')
    const component = await readFile(componentPath, 'utf8')

    expect(component).toContain('UserTable')
    expect(logger.success).toHaveBeenCalledWith(
      'Component created: layers/admin/app/components/UserTable.vue',
    )
  })

  it('does not overwrite an existing component', async () => {
    const componentPath = join(temporaryDir, 'app', 'components', 'UserTable.vue')
    const existingComponent = '<template>Existing component</template>'

    await mkdir(join(temporaryDir, 'app', 'components'), { recursive: true })
    await writeFile(componentPath, existingComponent, 'utf8')

    await expect(runCreateComponentCommand(['UserTable'])).rejects.toMatchObject({
      code: 'EEXIST',
    })

    await expect(readFile(componentPath, 'utf8')).resolves.toBe(existingComponent)
    expect(logger.success).not.toHaveBeenCalled()
  })

  it('rejects a component for a missing layer without creating directories', async () => {
    await expect(runCreateComponentCommand(['UserTable', '--layer', 'admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: join(temporaryDir, 'layers', 'admin'),
    })

    await expect(stat(join(temporaryDir, 'app'))).rejects.toMatchObject({ code: 'ENOENT' })
    expect(logger.success).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateComponentCommand([])).rejects.toMatchObject({ code: 'EARG' })
    await expect(runCreateComponentCommand(['userTable'])).rejects.toBeInstanceOf(ValidationError)
    await expect(
      runCreateComponentCommand(['UserTable', '--layer', 'Admin']),
    ).rejects.toBeInstanceOf(ValidationError)

    await expect(stat(join(temporaryDir, 'app'))).rejects.toMatchObject({ code: 'ENOENT' })
    expect(logger.success).not.toHaveBeenCalled()
  })
})
