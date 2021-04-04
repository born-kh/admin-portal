import { UserManagerModel, IAccount } from '@Interfaces'
import { APIConsts, LocalConsts } from '@Definitions'
import { Http } from '@Services'
import axios from 'axios'
import jsCookie from 'js-cookie'
export const ServiceUserManager = {
  searchAccount: async (paramsList: UserManagerModel.SearchAccount.Params[]) => {
    let allAccounts: IAccount[] = []
    let accounts: IAccount[] = []
    await Promise.all(
      paramsList.map(async (params) => {
        let response = await Http.Post<UserManagerModel.SearchAccount.Response>(APIConsts.Http, {
          method: APIConsts.UserManager.SearchAccount,
          params,
        })
        if (response.result) {
          allAccounts = allAccounts.concat(response.result.accounts)
        }
      })
    )

    await Promise.all(
      allAccounts.map(async (account) => {
        if (account.avatar) {
          let responseAvatar = await ServiceUserManager.getProfileAvatar(account.avatar)

          if (responseAvatar.status === 200) {
            accounts.push({ ...account, avatarUrl: URL.createObjectURL(responseAvatar.data) })
          } else {
            accounts.push({ ...account })
          }
        } else {
          accounts.push({ ...account })
        }
      })
    )

    return accounts
  },

  setPassword: async (params: UserManagerModel.SetPassword.Params) => {
    let response = await Http.Post<UserManagerModel.SetPassword.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.SetPassword,
      params,
    })
    return response
  },

  accountGetByDate: async (params: UserManagerModel.AccountGetByDate.Params) => {
    let response = await Http.Post<UserManagerModel.AccountGetByDate.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.AccountGetByDate,
      params,
    })
    return response
  },

  getAccountSettings: async (params: UserManagerModel.GetAccountSettings.Params) => {
    let response = await Http.Post<UserManagerModel.GetAccountSettings.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.GetAccountSettings,
      params,
    })
    return response
  },

  setAccountSettings: async (params: UserManagerModel.SetAccountSettings.Params) => {
    let response = await Http.Post<UserManagerModel.SetAccountSettings.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.SetAccountSettings,
      params,
    })
    return response
  },
  getUserPermissions: async (params: UserManagerModel.GetUserPermissions.Params) => {
    console.log(params)
    let response = await Http.Post<UserManagerModel.GetUserPermissions.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.GetUserPermissions,
      params,
    })
    return response
  },

  getProfile: async (params: UserManagerModel.GetProfile.Params) => {
    let response = await Http.Post<UserManagerModel.GetProfile.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.GetProfile,
      params,
    })
    return response
  },

  getProfileAvatar: async (avatarID: string) => {
    let token = jsCookie.get(LocalConsts.LocalStorage.token)
    let response = await axios.get(`${process.env.NEXT_PUBLIC_API_NEXSUS_URL}/files/file/${avatarID}/small`, {
      headers: {
        'X-Api-Key': process.env.NEXT_PUBLIC_API_KEY,
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    })
    return response
  },
}
