import { runCommand } from 'citty'
import { ExitCode } from '#mirai/common/constants/process'
import { setExitCode, getRawArgs } from '#mirai/common/utils/process'
import { ensureProjectRoot } from '#mirai/common/utils/guards'
import { handleError } from '#mirai/common/errors/handler'
import { mainCommand } from '#mirai/commands/main/command'

const run = async (rawArgs: string[]) => {
  try {
    await ensureProjectRoot()
    await runCommand(mainCommand, {
      rawArgs,
    })
  }
  catch (error) {
    handleError(error)
    setExitCode(ExitCode.FAILURE)
  }
}

void run(getRawArgs())
