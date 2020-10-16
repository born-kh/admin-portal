export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

interface UserLoginAction {
  type: typeof USER_LOGIN
}

interface UserLogoutAction {
  type: typeof USER_LOGOUT
}

export type AuthActionsTypes = UserLoginAction | UserLogoutAction
