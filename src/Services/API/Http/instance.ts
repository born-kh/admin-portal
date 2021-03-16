import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { PlatformUtil } from '@Utils'
import { LocalConsts } from '@Definitions'
import jsCookie from 'js-cookie'
import { ServiceAuth } from '../Auth'

const config: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_NEXSUS_URL}/`,
}
const instance: AxiosInstance = axios.create(config)

instance.interceptors.request.use(
  function (config) {
    let token = jsCookie.get(LocalConsts.LocalStorage.token)

    config.headers['X-Api-Key'] = process.env.NEXT_PUBLIC_API_KEY
    config.headers['X-App-Version'] = process.env.NEXT_PUBLIC_API_VERSION
    config.headers['X-Platform'] = process.env.NEXT_PUBLIC_API_PLATFORM
    config.headers['X-Device-Name'] = PlatformUtil.deviceName()
    config.headers['X-Device-ID'] = process.env.NEXT_PUBLIC_API_PLATFORM
    config.headers['X-App-Language'] = PlatformUtil.language()
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      if (response.data.error) {
        console.error('response error', response)
      } else {
        console.log('response', response)
      }
      setTimeout(() => {
        resolve(response)
      }, 500)
    })
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      let refreshToken = jsCookie.get(LocalConsts.LocalStorage.refreshToken)

      if (refreshToken) {
        ServiceAuth.refreshToken({ token: refreshToken })
          .then((response) => {
            console.log('refreshToken')
            console.log(response)
            if (response.result) {
              console.log(response)

              jsCookie.set(LocalConsts.LocalStorage.token, response.result.token)
              jsCookie.set(LocalConsts.LocalStorage.token, response.result.refreshToken)
            } else {
              console.log('logout')
              jsCookie.remove(LocalConsts.LocalStorage.token)
              jsCookie.remove(LocalConsts.LocalStorage.accountId)
              jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
            }

            setTimeout(() => {
              window.location.reload()
            }, 500)
          })
          .catch((e) => {
            console.log('logout')
            console.log(e)
            jsCookie.remove(LocalConsts.LocalStorage.token)
            jsCookie.remove(LocalConsts.LocalStorage.accountId)
            jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
            setTimeout(() => {
              window.location.reload()
            }, 500)
          })
      } else {
        jsCookie.remove(LocalConsts.LocalStorage.token)
        jsCookie.remove(LocalConsts.LocalStorage.accountId)
        jsCookie.remove(LocalConsts.LocalStorage.refreshToken)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }
      return Promise.reject(error)
    }
  }
)

export default instance
