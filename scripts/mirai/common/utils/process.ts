export const getCurrentDir = () => {
  return process.env.INIT_CWD ?? process.cwd()
}

export const setExitCode = (code: number) => {
  process.exitCode = code
}

export const getRawArgs = () => {
  return process.argv.slice(2)
}
