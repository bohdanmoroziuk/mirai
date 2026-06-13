import { defineSafeEventHandler } from '@core/server/utils/define-safe-event-handler'
import { reportServerError } from '@infra/server/utils/report-server-error'
import { getUsers } from '@user/server/services/user.service'

export default defineSafeEventHandler(() => {
  return getUsers()
}, {
  reportError: reportServerError,
})
