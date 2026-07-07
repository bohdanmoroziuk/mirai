import type { ExitCode } from '#mirai/common/constants/process'

export const getCurrentDir = () => {
  return process.env.INIT_CWD ?? process.cwd()
}

export const setExitCode = (code: ExitCode) => {
  process.exitCode = code
}

export const getRawArgs = () => {
  return process.argv.slice(2)
}
