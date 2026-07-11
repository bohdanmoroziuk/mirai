import type { H3Event } from 'h3'

export const requireUserId = async (event: H3Event): Promise<string> => {
  const session = await requireUserSession(event)
  return session.user.id
}
