import { AuthParams } from '@interfaces/auth'
import { Dispatch } from 'react'
import { authAPI } from 'service/api'
import { SESSION_TOKEN, permissions, USER_PERMISSION } from '@utils/constants'
import { AuthActionsTypes, USER_LOGIN, USER_LOGOUT } from './types'

export const login = (params: AuthParams) => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    return authAPI.login(params).then((responseLogin) => {
      if (responseLogin.status === 200) {
        const session_token = responseLogin.data.result.data.session_data.session_token

        localStorage.setItem(SESSION_TOKEN, session_token)
        authAPI.fetchPermissions(permissions, session_token).then((responsePermission) => {
          console.log(responsePermission)
          localStorage.setItem(USER_PERMISSION, JSON.stringify(responsePermission.data.result.data))
          dispatch({ type: USER_LOGIN })
        })
      }
    })
  }
}

export const checkAuth = () => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    authAPI
      .refreshSession()
      .then((response) => {
        if (response.data.result.data.authorization) {
          dispatch({ type: USER_LOGIN })
        } else {
          dispatch({ type: USER_LOGOUT })
        }
      })
      .catch(() => {
        dispatch({ type: USER_LOGOUT })
        localStorage.removeItem(SESSION_TOKEN)
      })
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    authAPI
      .logout()
      .then(() => {
        dispatch({ type: USER_LOGOUT })
        localStorage.removeItem(SESSION_TOKEN)
      })
      .catch(() => {
        dispatch({ type: USER_LOGOUT })
        localStorage.removeItem(SESSION_TOKEN)
      })
  }
}
