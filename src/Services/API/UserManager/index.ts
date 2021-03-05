import { UserManagerModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { Http } from '@Services'

export const ServiceUserManager = {
  searchAccount: async (params: UserManagerModel.SearchAccount.Params[]) => {
    let response = await Http.Post<UserManagerModel.SearchAccount.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.SearchAccount,
      params,
    })
    return response
  },

  setPassword: async (params: UserManagerModel.SetPassword.Params) => {
    let response = await Http.Post<UserManagerModel.SetPassword.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.SetPassword,
      params,
    })
    return response
  },

  resendCode: async (params: UserManagerModel.ResendCode.Params) => {
    let response = await Http.Post<UserManagerModel.ResendCode.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.ResendCode,
      params,
    })
    return response
  },

  getAuthCodeList: async (params: UserManagerModel.GetAuthCodeList.Params) => {
    let response = await Http.Post<UserManagerModel.GetAuthCodeList.Response>(APIConsts.Http, {
      method: APIConsts.UserManager.GetAuthCodeList,
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
}
