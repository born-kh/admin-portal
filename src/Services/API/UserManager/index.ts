import { UserManagerModel, IAccount } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceUserManager = {
  searchAccount: async (paramsList: UserManagerModel.SearchAccount.Params[]) => {
    let accounts: IAccount[] = []
    await Promise.all(
      paramsList.map(async (params) => {
        let response = await Http.Post<UserManagerModel.SearchAccount.Response>(APIConsts.Http, {
          method: APIConsts.UserManager.SearchAccount,
          params,
        })
        if (response.result) {
          accounts = accounts.concat(response.result.accounts)
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
}
