// #region Interface Imports
import { ApodPayload, ApodResponse, HttpModel, SearchTypeParams, Account, SystemSettings } from '@Interfaces'

// #endregion Interface Imports

declare namespace UserManagerModel {
  declare namespace SearchAccount {
    interface Params {
      type: SearchType
      search: string
    }

    interface Response {
      result: {
        accounts: Account[]
      }
    }
  }

  declare namespace AccountGetByDate {
    interface Params {
      ts: string
      type: FilterType
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        accounts: Account[]
      }
    }
  }
  declare namespace GetAuthCodeList {
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

  declare namespace ResendCode {
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

  declare namespace SetPassword {
    interface Params {
      accountId: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        message: string
        success: boolean
      }
    }
  }

  declare namespace SetAccountSettings {
    interface Params {
      accountID: string
      settings: SystemSettings
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {}
    }
  }
  declare namespace GetAccountSettings {
    interface Params {
      accountID: string
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        settings: SystemSettings[]
      }
    }
  }
}

export { UserManagerModel }
