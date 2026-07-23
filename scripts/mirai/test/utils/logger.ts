import { vi } from 'vitest'
import { logger } from '#mirai/common/utils/logger'

/**
 * Creates silent spies for the CLI success and informational log methods.
 *
 * @returns The created success and informational logger spies.
 */
export const createCliLoggerSpies = () => {
  return {
    success: vi.spyOn(logger, 'success').mockImplementation(() => {}),
    info: vi.spyOn(logger, 'info').mockImplementation(() => {}),
  }
}
