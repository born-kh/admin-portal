import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { SESSION_TOKEN } from './constants'
// import * as authAPI from 'service/authAPI'
import { AuthActionsTypes } from '@store/auth/types'
import { Dispatch } from 'react'

const config: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY_URL,
}
const instance: AxiosInstance = axios.create(config)

instance.interceptors.request.use(
  function (config) {
    const session_token = localStorage.getItem(SESSION_TOKEN)
    if (session_token) {
      config.headers['Authorization'] = session_token
      config.headers['Content-Type'] = 'application/json; charset=utf-8'
      config.headers['Accept'] = 'application/json'
      config.headers['Access-Control-Allow-Origin'] = '*'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    console.log(error)
    if (error.response && error.response.status === 401) {
      return async (dispatch: Dispatch<AuthActionsTypes>) => {
        // dispatch(authAPI.logout())
      }
    }
    return Promise.reject(error)
  }
)

export default instance
