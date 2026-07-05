import { runCommand } from 'citty'
import { getErrorMessage } from '#mirai/common/utils/error'
import { setExitCode, getRawArgs } from '#mirai/common/utils/process'
import { logger } from '#mirai/common/utils/logger'
import { mainCommand } from '#mirai/commands/main/command'

const run = async (rawArgs: string[]) => {
  try {
    await runCommand(mainCommand, {
      rawArgs,
    })
  }
  catch (error) {
    logger.error(getErrorMessage(error))
    setExitCode(1)
  }
}

run(getRawArgs())
