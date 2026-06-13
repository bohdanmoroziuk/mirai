export default defineSafeEventHandler(async (event) => {
  await clearUserSession(event)

  return createResponse({ success: true })
}, {
  reportError: reportServerError,
})
