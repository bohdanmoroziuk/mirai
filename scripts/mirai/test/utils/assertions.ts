import { stat } from 'node:fs/promises'
import { expect } from 'vitest'
import { NodeErrorCode } from '#mirai/common/errors/node'

/**
 * Asserts that a filesystem path does not exist.
 *
 * @param path - The path expected to be missing.
 * @returns A promise that resolves once the missing-path assertion passes.
 */
export const expectPathMissing = async (path: string): Promise<void> => {
  await expect(stat(path)).rejects.toMatchObject({
    code: NodeErrorCode.PATH_NOT_FOUND,
  })
}
