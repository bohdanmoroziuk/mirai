export const getHostname = (url: string): string => {
  return new URL(url).hostname
}

export const isValidUrl = (value: unknown): value is string => {
  if (typeof value !== 'string') {
    return false
  }

  try {
    new URL(value)
    return true
  }
  catch {
    return false
  }
}
