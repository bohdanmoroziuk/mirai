export default defineNuxtRouteMiddleware((to) => {
  if (isFalsy(to.meta.devOnly)) {
    return
  }

  if (import.meta.dev) {
    return
  }

  return abortNavigation(createError({
    status: 404,
    statusText: 'Page Not Found',
  }))
})
