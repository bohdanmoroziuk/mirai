import { runCommand } from 'citty'
import { getErrorMessage } from '#mirai/common/utils/error'
import { setExitCode, getRawArgs } from '#mirai/common/utils/process'
import { logger } from '#mirai/common/utils/logger'
import { ensureProjectRoot } from '#mirai/common/utils/guards'
import { mainCommand } from '#mirai/commands/main/command'

const run = async (rawArgs: string[]) => {
  try {
    await ensureProjectRoot()
    await runCommand(mainCommand, {
      rawArgs,
    })
  }
  catch (error) {
    logger.error(getErrorMessage(error))
    setExitCode(1)
  }
}

void run(getRawArgs())
