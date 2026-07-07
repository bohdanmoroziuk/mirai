import { runCommand } from 'citty'
import { ExitCode } from '#mirai/common/constants/process'
import { getErrorMessage } from '#mirai/common/utils/error'
import { setExitCode, getRawArgs } from '#mirai/common/utils/process'
import { logger } from '#mirai/common/utils/logger'
import { ensureProjectRoot } from '#mirai/common/utils/guards'
import { isValidationError, renderValidationError } from '#mirai/common/errors/validation'
import { isFileSystemError, renderFileSystemError } from '#mirai/common/errors/fs'
import { mainCommand } from '#mirai/commands/main/command'

const run = async (rawArgs: string[]) => {
  try {
    await ensureProjectRoot()
    await runCommand(mainCommand, {
      rawArgs,
    })
  }
  catch (error) {
    if (isValidationError(error)) {
      renderValidationError(error)
      setExitCode(ExitCode.FAILURE)
      return
    }

    if (isFileSystemError(error)) {
      renderFileSystemError(error)
      setExitCode(ExitCode.FAILURE)
      return
    }

    logger.error(getErrorMessage(error))
    setExitCode(ExitCode.FAILURE)
  }
}

void run(getRawArgs())
