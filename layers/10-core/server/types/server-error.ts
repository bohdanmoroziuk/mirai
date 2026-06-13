export type ServerErrorContext = {
  method?: string
  url?: string
  statusCode?: number
  userId?: string
}

export type ServerErrorReporter = (
  error: unknown,
  context?: ServerErrorContext,
) => void
