export const ExitCode = {
  SUCCESS: 0,
  FAILURE: 1,
} as const

export type ExitCode = (typeof ExitCode)[keyof typeof ExitCode]
