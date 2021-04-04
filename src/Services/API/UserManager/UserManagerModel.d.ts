// #region Interface Imports
import { HttpModel, IAccount, IAccountSystemSettings, IPermissions, IProfile } from '@Interfaces'

// #endregion Interface Imports

declare namespace UserManagerModel {
  declare namespace SearchAccount {
    interface Params {
      type: SearchType
      search: string
    }

    interface Response {
      result: {
        accounts: IAccount[]
      }
    }
  }

  declare namespace AccountGetByDate {
    interface Params {
      ts: string
      type: AccountFilterType
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        accounts: IAccount[]
      }
    }
  }

  declare namespace SetPassword {
    interface Params {
      accountID: string
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
      settings: IAccountSystemSettings
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
        settings: IAccountSystemSettings
      }
    }
  }

  declare namespace GetUserPermissions {
    interface Params {}

    interface Response extends HttpModel.IRequestResponse {
      result: {
        permissions: string[]
      }
    }
  }

  declare namespace GetProfile {
    interface Params {
      accointIDs?: string[]
    }

    interface Response extends HttpModel.IRequestResponse {
      result: {
        profile: IProfile
      }
    }
  }
}

export { UserManagerModel }
