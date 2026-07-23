import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'pathe'

export type TemporaryCliProject = {
  readonly root: string
  setup: () => Promise<void>
  cleanup: () => Promise<void>
}

/**
 * Creates lifecycle helpers for an isolated temporary Mirai CLI project.
 *
 * @param prefix - A unique label used in the temporary directory name.
 * @returns Helpers that set up, clean up, and expose the temporary project root.
 */
export const createTemporaryCliProject = (prefix: string): TemporaryCliProject => {
  let temporaryDir: string | undefined
  let previousInitCwd: string | undefined
  let isSetup = false

  return {
    get root() {
      if (temporaryDir === undefined) {
        throw new Error('The temporary CLI project must be set up before its root is accessed.')
      }

      return temporaryDir
    },

    async setup() {
      previousInitCwd = process.env.INIT_CWD
      temporaryDir = await mkdtemp(join(tmpdir(), `mirai-cli-${prefix}-`))
      process.env.INIT_CWD = temporaryDir
      isSetup = true
    },

    async cleanup() {
      if (!isSetup || temporaryDir === undefined) {
        return
      }

      const directory = temporaryDir

      if (previousInitCwd === undefined) {
        delete process.env.INIT_CWD
      }
      else {
        process.env.INIT_CWD = previousInitCwd
      }

      await rm(directory, { recursive: true, force: true })
      temporaryDir = undefined
      isSetup = false
    },
  }
}
