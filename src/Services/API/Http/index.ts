// #region Interface Imports
import instance from './instance'
import { HttpModel } from './Http'
// #endregion Interface Imports

export const Http = {
  Get: async <A>(url: string, params?: HttpModel.IRequestPayload): Promise<A> => {
    return new Promise((resolve, reject) => {
      instance
        .get(url, params)
        .then(async (response) => {
          if (response.status === 200) {
            return resolve(response.data)
          }
          return reject(response)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },

  Post: async <A>(url: string, params?: HttpModel.IRequestPayload): Promise<A> => {
    return new Promise((resolve, reject) => {
      instance
        .post(url, params)
        .then(async (response) => {
          if (response.status === 200) {
            return resolve(response.data)
          }
          return reject(response)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
}
