import { PageAccess } from '../../shared/types/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, fetch } = useUserSession()

  const access = to.meta.access ?? PageAccess.Public

  if (access === PageAccess.Public) {
    return
  }

  await fetch()

  if (access === PageAccess.Private && loggedIn.value === false) {
    return navigateTo('/auth/signup')
  }

  if (access === PageAccess.GuestOnly && loggedIn.value) {
    return navigateTo('/')
  }
})
