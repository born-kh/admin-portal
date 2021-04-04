import { USER_LOGIN, USER_LOGOUT, AuthActionsTypes } from './types'
import { AUTH_STATUS } from '@utils/constants'

const initialState = {
  authStatus: AUTH_STATUS.unknown,
  username: '',
}

export default (state = initialState, action: AuthActionsTypes): { authStatus: AUTH_STATUS; username: string } => {
  switch (action.type) {
    case USER_LOGIN:
      return { authStatus: AUTH_STATUS.loggedOn, username: action.payload }
    case USER_LOGOUT:
      return { authStatus: AUTH_STATUS.loggedOut, username: '' }
    default:
      return state
  }
}
