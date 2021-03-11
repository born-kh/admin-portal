// #region Local Imports
import { Http } from '@Services'
// #endregion Local Imports

// #region Interface Imports
import { AuthModel } from '@Interfaces'
import { APIConsts } from '@Definitions'
import { HelpersUtils } from '@utils/helpers'

// #endregion Interface Imports

export const ServiceAuth = {
  signIn: async (params: AuthModel.SignIn.Params) => {
    let response = await Http.Post<AuthModel.SignIn.Response>(APIConsts.Request, {
      method: APIConsts.Auth.SignIn,
      params,
    })
    return response
  },
  refreshToken: async (params: AuthModel.RefreshToken.Params) => {
    let response = await Http.Post<AuthModel.RefreshToken.Response>(APIConsts.Request, {
      method: APIConsts.Auth.RefreshToken,
      params,
    })
    return response
  },
}
