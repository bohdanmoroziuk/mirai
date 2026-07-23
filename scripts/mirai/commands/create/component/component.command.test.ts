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
import { createComponentCommand } from './component.command'

const runCreateComponentCommand = (rawArgs: string[]) => {
  return runCommand(createComponentCommand, { rawArgs })
}

describe.sequential('create component command', () => {
  const project = createTemporaryCliProject('component-command')
  let loggerSpies: ReturnType<typeof createCliLoggerSpies>

  beforeEach(async () => {
    await project.setup()
    loggerSpies = createCliLoggerSpies()
  })

  afterEach(async () => {
    vi.restoreAllMocks()
    await project.cleanup()
  })

  it('creates a component in the project root', async () => {
    await runCreateComponentCommand(['UserTable'])

    const componentPath = join(project.root, 'app', 'components', 'UserTable.vue')
    const component = await readFile(componentPath, 'utf8')

    expect(component).toContain('<script setup lang="ts">')
    expect(component).toContain('UserTable')
    expect(loggerSpies.success).toHaveBeenCalledWith('Component created: app/components/UserTable.vue')
  })

  it('creates a component inside an existing layer', async () => {
    await mkdir(join(project.root, 'layers', 'admin'), { recursive: true })

    await runCreateComponentCommand(['UserTable', '--layer', 'admin'])

    const componentPath = join(project.root, 'layers', 'admin', 'app', 'components', 'UserTable.vue')
    const component = await readFile(componentPath, 'utf8')

    expect(component).toContain('UserTable')
    expect(loggerSpies.success).toHaveBeenCalledWith(
      'Component created: layers/admin/app/components/UserTable.vue',
    )
  })

  it('does not overwrite an existing component', async () => {
    const componentPath = join(project.root, 'app', 'components', 'UserTable.vue')
    const existingComponent = '<template>Existing component</template>'

    await mkdir(join(project.root, 'app', 'components'), { recursive: true })
    await writeFile(componentPath, existingComponent, 'utf8')

    await expect(runCreateComponentCommand(['UserTable'])).rejects.toMatchObject({
      code: NodeErrorCode.PATH_ALREADY_EXISTS,
    })

    await expect(readFile(componentPath, 'utf8')).resolves.toBe(existingComponent)
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })

  it('rejects a component for a missing layer without creating directories', async () => {
    await expect(runCreateComponentCommand(['UserTable', '--layer', 'admin'])).rejects.toMatchObject({
      name: FileSystemError.name,
      action: 'check',
      path: join(project.root, 'layers', 'admin'),
    })

    await expectPathMissing(join(project.root, 'app'))
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })

  it('rejects missing and invalid arguments without creating directories', async () => {
    await expect(runCreateComponentCommand([])).rejects.toMatchObject({ code: CittyErrorCode.ARGUMENT })
    await expect(runCreateComponentCommand(['userTable'])).rejects.toBeInstanceOf(ValidationError)
    await expect(
      runCreateComponentCommand(['UserTable', '--layer', 'Admin']),
    ).rejects.toBeInstanceOf(ValidationError)

    await expectPathMissing(join(project.root, 'app'))
    expect(loggerSpies.success).not.toHaveBeenCalled()
  })
})
