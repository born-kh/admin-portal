import { USER_LOGIN, USER_LOGOUT, AuthActionsTypes } from './types'

export const initialState = {
  isAuth: false,
}

export default (state = initialState, action: AuthActionsTypes): { isAuth: boolean } => {
  switch (action.type) {
    case USER_LOGIN:
      return { isAuth: true }
    case USER_LOGOUT:
      return { isAuth: false }
    default:
      return state
  }
}
