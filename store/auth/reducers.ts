import { USER_LOGIN, USER_LOGOUT, AuthActionsTypes } from './types'
import { AUTH_STATUS } from '@utils/constants'

export default (state = AUTH_STATUS.unknown, action: AuthActionsTypes): AUTH_STATUS => {
  switch (action.type) {
    case USER_LOGIN:
      return AUTH_STATUS.loggedOn
    case USER_LOGOUT:
      return AUTH_STATUS.loggedOut
    default:
      return state
  }
}
