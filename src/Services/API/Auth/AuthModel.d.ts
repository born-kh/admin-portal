// #region Interface Imports
import { HttpModel } from '@Interfaces'
// #endregion Interface Imports

declare namespace AuthModel {
  declare namespace RefreshToken {
    interface Params {
      token: string
    }

    interface Response {
      result: {
        token: string
        refreshToken: string
      }
    }
  }
  declare namespace SignIn {
    interface Params {
      username: string
      password: string
      usernameType: UserNameType
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        token: string
        accountID: string
        refreshToken: string
      }
    }
  }
}

export { AuthModel }
