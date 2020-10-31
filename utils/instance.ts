import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { SESSION_TOKEN } from './constants'
import * as authAPI from 'service/authAPI'

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:8080',
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
    if (error.response && error.response.status === 401) {
      authAPI.logout()
    }
    return Promise.reject(error)
  }
)

export default instance
