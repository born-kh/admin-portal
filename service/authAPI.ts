import { AuthParams } from 'interfaces/auth'
import instance from '@utils/instance'
import { Dispatch } from 'redux'
import { AuthActionsTypes, USER_LOGIN, USER_LOGOUT } from '@store/auth/types'
import { SESSION_TOKEN, permissions, USER_PERMISSION } from '@utils/constants'

export const login = (params: AuthParams) => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    return instance.post('/login', params).then((responseLogin) => {
      console.log(responseLogin)
      if (responseLogin.status === 200) {
        const session_token = responseLogin.data.data.session_data.session_token

        localStorage.setItem(SESSION_TOKEN, session_token)
        return instance
          .post('/getpermissions', {
            permissions: permissions,
            metadata: {
              headers: { Authorization: session_token },
            },
          })
          .then((responsePermission) => {
            localStorage.setItem(USER_PERMISSION, JSON.stringify(responsePermission.data.result.data))
            dispatch({ type: USER_LOGIN })
          })
      }
    })
  }
}

export const checkAuth = () => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    try {
      console.log('checkAuth')
      const response = await instance.post('/refreshsession')
      if (response.data.result.data.authorization) {
        dispatch({ type: USER_LOGIN })
      } else {
        dispatch({ type: USER_LOGOUT })
      }
    } catch (e) {
      dispatch({ type: USER_LOGOUT })
      localStorage.removeItem(SESSION_TOKEN)
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthActionsTypes>) => {
    try {
      const response = await instance.post('/logout', { reason_note: 'User request' })
      console.log(response)
      dispatch({ type: USER_LOGOUT })
      localStorage.removeItem(SESSION_TOKEN)
    } catch (e) {
      dispatch({ type: USER_LOGOUT })
      localStorage.removeItem(SESSION_TOKEN)
    }
  }
}
