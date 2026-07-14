export const readClipboardText = async (): Promise<Nullable<string>> => {
  if (!import.meta.client) return null
  if (!navigator.clipboard?.readText) return null

  try {
    return await navigator.clipboard.readText()
  }
  catch {
    return null
  }
}
