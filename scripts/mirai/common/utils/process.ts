export const setExitCode = (code: number) => {
  process.exitCode = code
}

export const getRawArgs = () => {
  return process.argv.slice(2)
}
